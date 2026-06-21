import { Resend } from 'resend'

const PORTAL_URL = 'https://rewarm.co/portal'

const PLAN_DETAILS: Record<string, { leads: string; highlight: string }> = {
  Starter: {
    leads: '100 leads / month',
    highlight: '',
  },
  Growth: {
    leads: '300 leads / month',
    highlight: '',
  },
  Pro: {
    leads: '600 leads / month',
    highlight: 'Your plan includes a dedicated onboarding call and custom agent setup.',
  },
}

export async function sendWelcomeEmail(buyerEmail: string, plan: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not set')

  const resend = new Resend(apiKey)
  const from = process.env.FROM_EMAIL ?? 'hello@rewarm.co'
  const details = PLAN_DETAILS[plan] ?? { leads: '', highlight: '' }

  const subject = `Welcome to ReWarm — your ${plan} plan is active`

  const text = `Hi,

Thank you for choosing ReWarm. Your ${plan} Plan is now active — ${details.leads}.
${details.highlight ? `\n${details.highlight}\n` : ''}
Your client portal is ready:
${PORTAL_URL}

Your personalized onboarding instructions will arrive within 24 hours.

One thing you can do right now: locate your existing lead list in Google Sheets, or export it as a CSV from your CRM. We'll use it to configure your AI calling agent during onboarding.

Questions before then? Reply directly to this email.

Looking forward to getting you results,
The ReWarm Team`

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="background:#111111;padding:28px 40px;">
          <span style="color:#f97316;font-family:Georgia,serif;font-size:22px;font-weight:700;letter-spacing:-0.5px;">ReWarm</span>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111111;line-height:1.3;">
            Your ${plan} Plan is active.
          </p>
          <p style="margin:0 0 28px;color:#555555;font-size:16px;line-height:1.6;">
            Thank you for choosing ReWarm.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf7;border-left:3px solid #f97316;border-radius:4px;margin-bottom:28px;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0;font-size:14px;font-weight:700;color:#111111;">${plan} Plan</p>
                <p style="margin:4px 0 0;font-size:14px;color:#555555;">${details.leads}</p>
                ${details.highlight ? `<p style="margin:8px 0 0;font-size:14px;color:#555555;">${details.highlight}</p>` : ''}
              </td>
            </tr>
          </table>

          <p style="margin:0 0 24px;">
            <a href="${PORTAL_URL}" style="display:inline-block;background:#f97316;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;">
              Access Your Portal →
            </a>
          </p>

          <p style="margin:0 0 16px;font-size:15px;color:#333333;line-height:1.7;">
            Your personalized onboarding instructions will arrive within 24 hours.
          </p>

          <p style="margin:0 0 4px;font-size:15px;color:#333333;line-height:1.7;">
            <strong>One thing you can do right now:</strong>
          </p>
          <p style="margin:0 0 28px;font-size:15px;color:#555555;line-height:1.7;">
            Locate your existing lead list in Google Sheets, or export it as a CSV from your CRM. We'll use it to configure your AI calling agent during onboarding.
          </p>

          <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 24px;">
          <p style="margin:0;font-size:14px;color:#888888;line-height:1.6;">
            Questions before then? Reply directly to this email.<br>
            — The ReWarm Team
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

  const { error } = await resend.emails.send({ from, to: buyerEmail, subject, text, html })
  if (error) throw new Error(`Resend send failed: ${(error as { message?: string }).message ?? String(error)}`)
}
