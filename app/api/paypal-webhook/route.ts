import { NextRequest, NextResponse } from 'next/server'
import { verifyPayPalWebhook } from '@/lib/paypal/verify'
import { detectPlan } from '@/lib/paypal/plans'
import { insertPurchaseIfNew, markWelcomeEmailSent } from '@/lib/db/purchases'
import { sendWelcomeEmail } from '@/lib/email/sendWelcome'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const transmissionId = req.headers.get('paypal-transmission-id') ?? 'no-transmission-id'
  console.log(`[paypal-webhook] ── REQUEST RECEIVED ── transmission-id: ${transmissionId}`)

  // Read raw body once — signature verification depends on the exact bytes
  const rawBody = await req.text()
  console.log(`[paypal-webhook] Raw body length: ${rawBody.length} bytes`)

  // ── Step 1: Verify PayPal webhook signature ──────────────────────────────
  let isValid: boolean
  try {
    isValid = await verifyPayPalWebhook(req.headers, rawBody)
  } catch (err) {
    console.error('[paypal-webhook] VERIFICATION ERROR:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }

  if (!isValid) {
    console.warn(`[paypal-webhook] INVALID SIGNATURE — transmission-id: ${transmissionId}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  console.log(`[paypal-webhook] ✓ Signature verified — transmission-id: ${transmissionId}`)

  // ── Step 2: Parse event ──────────────────────────────────────────────────
  const event = JSON.parse(rawBody) as Record<string, unknown>
  const eventType = event.event_type as string
  const eventId = event.id as string
  console.log(`[paypal-webhook] Event type: ${eventType} — event-id: ${eventId}`)

  if (eventType !== 'PAYMENT.CAPTURE.COMPLETED') {
    console.log(`[paypal-webhook] Ignoring event type "${eventType}" — no action needed`)
    return NextResponse.json({ received: true })
  }

  const resource = (event.resource ?? {}) as Record<string, unknown>

  if (resource.status !== 'COMPLETED') {
    console.log(`[paypal-webhook] Resource status "${resource.status}" — skipping`)
    return NextResponse.json({ received: true })
  }

  // ── Step 3: Extract purchase fields ─────────────────────────────────────
  const captureId = resource.id as string
  const amountObj = resource.amount as Record<string, unknown> | undefined
  const amount = parseFloat((amountObj?.value as string) ?? '0')
  const paidAt =
    (resource.update_time as string | undefined) ??
    (resource.create_time as string | undefined) ??
    null

  const payer = resource.payer as Record<string, unknown> | undefined
  const paymentSource = resource.payment_source as Record<string, unknown> | undefined
  const paypalSource = paymentSource?.paypal as Record<string, unknown> | undefined
  const buyerEmail: string =
    (payer?.email_address as string | undefined) ??
    (paypalSource?.email_address as string | undefined) ??
    ''

  if (!buyerEmail) {
    console.error(
      `[paypal-webhook] MISSING BUYER EMAIL — event-id: ${eventId}, capture-id: ${captureId}. ` +
      `PayPal will retry. Payer keys: ${Object.keys(payer ?? {}).join(',')} ` +
      `PaymentSource keys: ${Object.keys(paymentSource ?? {}).join(',')}`
    )
    return NextResponse.json({ error: 'Missing buyer email' }, { status: 503 })
  }

  // ── Step 4: Detect plan ──────────────────────────────────────────────────
  const plan = detectPlan(resource)
  if (!plan) {
    console.error(`[paypal-webhook] UNKNOWN PLAN — amount: ${amount}, event-id: ${eventId}`)
    return NextResponse.json({ received: true })
  }
  console.log(`[paypal-webhook] Plan: ${plan} — buyer: ${buyerEmail}, amount: ${amount}, capture-id: ${captureId}`)

  // ── Step 5: Insert purchase (idempotent) ─────────────────────────────────
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
    console.error('[paypal-webhook] DB INSERT ERROR:', err)
    return NextResponse.json({ error: 'Storage failed' }, { status: 500 })
  }

  if (!isNew) {
    console.log(`[paypal-webhook] Duplicate event — already processed: ${eventId}`)
    return NextResponse.json({ received: true })
  }
  console.log(`[paypal-webhook] ✓ Purchase recorded — event-id: ${eventId}, buyer: ${buyerEmail}, plan: ${plan}`)

  // ── Step 6: Send welcome email ───────────────────────────────────────────
  try {
    await sendWelcomeEmail(buyerEmail, plan)
    await markWelcomeEmailSent(eventId)
    console.log(`[paypal-webhook] ✓ Welcome email sent — buyer: ${buyerEmail}, plan: ${plan}`)
  } catch (err) {
    console.error(`[paypal-webhook] EMAIL FAILED for ${buyerEmail}:`, err)
    // Non-fatal: purchase is recorded; email can be retried from DB rows where welcome_email_sent_at IS NULL
  }

  console.log(`[paypal-webhook] ── DONE ── event-id: ${eventId}`)
  return NextResponse.json({ received: true })
}
