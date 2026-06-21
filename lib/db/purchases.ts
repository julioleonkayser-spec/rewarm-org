import { createClient } from '@supabase/supabase-js'

function getClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(url, key)
}

export interface PurchaseInsert {
  paypal_event_id: string
  paypal_capture_id: string
  buyer_email: string
  plan: string
  amount: number
  status: string
  paid_at: string | null
}

// Returns true if the row was newly inserted, false if it was a duplicate.
export async function insertPurchaseIfNew(record: PurchaseInsert): Promise<boolean> {
  const supabase = getClient()
  const { error } = await supabase.from('purchases').insert(record)

  if (error) {
    // Postgres unique violation — duplicate event or capture id
    if (error.code === '23505') return false
    throw new Error(`Supabase insert failed: ${error.message}`)
  }

  return true
}

export async function markWelcomeEmailSent(paypalEventId: string): Promise<void> {
  const supabase = getClient()
  const { error } = await supabase
    .from('purchases')
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq('paypal_event_id', paypalEventId)

  if (error) throw new Error(`Supabase update failed: ${error.message}`)
}
