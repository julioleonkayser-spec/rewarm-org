export type PlanName = 'Starter' | 'Growth' | 'Pro'

// Keyword matching against item name, description, or custom_id
const PLAN_KEYWORDS: [PlanName, string[]][] = [
  ['Starter', ['starter']],
  ['Growth', ['growth']],
  ['Pro', ['pro']],
]

// Fallback: exact amount strings from live PayPal payment links
// Update here if pricing changes — nowhere else.
const AMOUNT_TO_PLAN: Record<string, PlanName> = {
  '97.00': 'Starter',
  '97.99': 'Starter',
  '197.00': 'Growth',
  '397.00': 'Pro',
}

function matchKeywords(text: string): PlanName | null {
  const lower = text.toLowerCase()
  for (const [plan, keywords] of PLAN_KEYWORDS) {
    if (keywords.some((k) => lower.includes(k))) return plan
  }
  return null
}

export function detectPlan(resource: Record<string, unknown>): PlanName | null {
  // 1. Try purchase_units metadata (items, description, custom_id)
  const units = resource.purchase_units as Array<Record<string, unknown>> | undefined
  if (units?.length) {
    const unit = units[0]

    const items = unit.items as Array<Record<string, unknown>> | undefined
    if (items?.length) {
      const name = String(items[0].name ?? '')
      const match = matchKeywords(name)
      if (match) return match
    }

    const description = String(unit.description ?? '')
    const descMatch = matchKeywords(description)
    if (descMatch) return descMatch

    const customId = String(unit.custom_id ?? '')
    const customMatch = matchKeywords(customId)
    if (customMatch) return customMatch
  }

  // 2. Amount-based fallback
  const amountValue = (resource.amount as Record<string, unknown> | undefined)?.value
  if (typeof amountValue === 'string' && AMOUNT_TO_PLAN[amountValue]) {
    return AMOUNT_TO_PLAN[amountValue]
  }

  return null
}
