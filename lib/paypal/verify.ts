const PAYPAL_API_BASE =
  process.env.PAYPAL_ENV === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error('PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET not set')

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

  if (!res.ok) throw new Error(`PayPal token fetch failed: ${res.status}`)
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export async function verifyPayPalWebhook(
  headers: Headers,
  rawBody: string
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  if (!webhookId) throw new Error('PAYPAL_WEBHOOK_ID not set')

  const accessToken = await getAccessToken()

  const certUrl = headers.get('paypal-cert-url') ?? ''
  const VALID_CERT_PREFIXES = [
    'https://api.paypal.com',
    'https://api-m.paypal.com',
    'https://api.sandbox.paypal.com',
    'https://api-m.sandbox.paypal.com',
  ]
  if (!VALID_CERT_PREFIXES.some((prefix) => certUrl.startsWith(prefix))) {
    return false
  }

  const verifyPayload = {
    auth_algo: headers.get('paypal-auth-algo') ?? '',
    cert_url: certUrl,
    transmission_id: headers.get('paypal-transmission-id') ?? '',
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

  if (!res.ok) return false
  const data = (await res.json()) as { verification_status: string }
  return data.verification_status === 'SUCCESS'
}
