import { NextRequest, NextResponse } from 'next/server'
import { verifyPayPalWebhook } from '@/lib/paypal/verify'
import { detectPlan } from '@/lib/paypal/plans'
import { insertPurchaseIfNew, markWelcomeEmailSent } from '@/lib/db/purchases'
import { sendWelcomeEmail } from '@/lib/email/sendWelcome'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // Read body once — needed for both verification and parsing
  const rawBody = await req.text()

  // 1. Verify the webhook signature with PayPal
  let isValid: boolean
  try {
    isValid = await verifyPayPalWebhook(req.headers, rawBody)
  } catch (err) {
    console.error('[paypal-webhook] Verification error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as Record<string, unknown>

  // 2. Only handle successful payment captures
  if (event.event_type !== 'PAYMENT.CAPTURE.COMPLETED') {
    return NextResponse.json({ received: true })
  }

  const resource = (event.resource ?? {}) as Record<string, unknown>

  // Guard: only process COMPLETED status
  if (resource.status !== 'COMPLETED') {
    return NextResponse.json({ received: true })
  }

  // 3. Extract required fields
  const eventId = event.id as string
  const captureId = resource.id as string

  const amountObj = resource.amount as Record<string, unknown> | undefined
  const amount = parseFloat((amountObj?.value as string) ?? '0')

  // Paid timestamp — prefer update_time (capture confirmation time)
  const paidAt =
    (resource.update_time as string | undefined) ??
    (resource.create_time as string | undefined) ??
    null

  // Buyer email: PayPal exposes it at different paths depending on flow
  const payer = resource.payer as Record<string, unknown> | undefined
  const paymentSource = resource.payment_source as Record<string, unknown> | undefined
  const paypalSource = paymentSource?.paypal as Record<string, unknown> | undefined

  const buyerEmail: string =
    (payer?.email_address as string | undefined) ??
    (paypalSource?.email_address as string | undefined) ??
    ''

  if (!buyerEmail) {
    console.error(`[paypal-webhook] Missing buyer email for verified COMPLETED capture — event ${eventId}, capture ${captureId}. PayPal will retry.`)
    return NextResponse.json({ error: 'Missing buyer email' }, { status: 503 })
  }

  // 4. Detect plan — specific fields first, amount fallback last
  const plan = detectPlan(resource)
  if (!plan) {
    console.error(`[paypal-webhook] Unknown plan for amount ${amount}, event ${eventId}`)
    return NextResponse.json({ received: true })
  }

  // 5. Insert — idempotency enforced by UNIQUE(paypal_event_id) in Supabase
  let isNew: boolean
  try {
    isNew = await insertPurchaseIfNew({
      paypal_event_id: eventId,
      paypal_capture_id: captureId,
      buyer_email: buyerEmail,
      plan,
      amount,
      status: resource.status as string,
      paid_at: paidAt,
    })
  } catch (err) {
    console.error('[paypal-webhook] DB insert error:', err)
    // Return 500 so PayPal retries — we haven't sent any email yet
    return NextResponse.json({ error: 'Storage failed' }, { status: 500 })
  }

  if (!isNew) {
    // Duplicate delivery — already processed
    return NextResponse.json({ received: true })
  }

  // 6. Send welcome email exactly once per new purchase
  try {
    await sendWelcomeEmail(buyerEmail, plan)
    await markWelcomeEmailSent(eventId)
  } catch (err) {
    // Purchase is recorded; email failure is non-fatal.
    // Rows with welcome_email_sent_at = NULL can be retried separately.
    console.error(`[paypal-webhook] Welcome email failed for ${buyerEmail}:`, err)
  }

  return NextResponse.json({ received: true })
}
