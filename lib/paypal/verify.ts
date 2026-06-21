const PAYPAL_ENV = process.env.PAYPAL_ENV ?? 'production'

const PAYPAL_API_BASE =
  PAYPAL_ENV === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET not set in environment')
  }

  console.log(`[paypal-verify] Fetching OAuth token — env: ${PAYPAL_ENV}, base: ${PAYPAL_API_BASE}`)

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `PayPal token fetch failed: ${res.status} — ` +
      `env=${PAYPAL_ENV}, base=${PAYPAL_API_BASE}. ` +
      `A 401 means your PAYPAL_CLIENT_ID/SECRET don't match PAYPAL_ENV="${PAYPAL_ENV}". ` +
      `Sandbox credentials only work against api-m.sandbox.paypal.com. ` +
      `Response: ${body.slice(0, 200)}`
    )
  }

  const data = (await res.json()) as { access_token: string }
  console.log('[paypal-verify] OAuth token obtained successfully')
  return data.access_token
}

export async function verifyPayPalWebhook(
  headers: Headers,
  rawBody: string
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) throw new Error('PAYPAL_WEBHOOK_ID not set in environment')

  const accessToken = await getAccessToken()

  const certUrl = headers.get('paypal-cert-url') ?? ''
  const VALID_CERT_PREFIXES = [
    'https://api.paypal.com',
    'https://api-m.paypal.com',
    'https://api.sandbox.paypal.com',
    'https://api-m.sandbox.paypal.com',
  ]
  if (!VALID_CERT_PREFIXES.some((prefix) => certUrl.startsWith(prefix))) {
    console.warn(`[paypal-verify] Rejected cert URL: "${certUrl}" — not a known PayPal domain`)
    return false
  }

  const transmissionId = headers.get('paypal-transmission-id') ?? ''
  console.log(`[paypal-verify] Calling verify-webhook-signature — transmission-id: ${transmissionId}, webhook-id: ${webhookId}`)

  const verifyPayload = {
    auth_algo: headers.get('paypal-auth-algo') ?? '',
    cert_url: certUrl,
    transmission_id: transmissionId,
    transmission_sig: headers.get('paypal-transmission-sig') ?? '',
    transmission_time: headers.get('paypal-transmission-time') ?? '',
    webhook_id: webhookId,
    webhook_event: JSON.parse(rawBody) as unknown,
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verifyPayload),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`[paypal-verify] Signature verification API returned ${res.status}: ${body.slice(0, 200)}`)
    return false
  }

  const data = (await res.json()) as { verification_status: string }
  console.log(`[paypal-verify] Verification result: ${data.verification_status}`)
  return data.verification_status === 'SUCCESS'
}
