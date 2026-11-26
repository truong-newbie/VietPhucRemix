// Logic thuần túy quản lý Credit AI & Quyền lợi gói Pro (dễ kiểm thử đơn vị)

export const INITIAL_FREE_CREDITS = 2;

export function createDefaultEntitlements() {
  return {
    planId: 'free',
    credits: INITIAL_FREE_CREDITS,
    removeWatermark: false,
    partnerDiscountPercent: 10,
    orders: []
  };
}

export function applyPurchasedPlan(current, plan, orderCode, timestamp = new Date().toISOString()) {
  const base = current || createDefaultEntitlements();
  if (!plan) return base;

  const order = {
    orderCode,
    planId: plan.id,
    planName: plan.name,
    amountVnd: plan.priceVnd,
    creditsAdded: plan.credits,
    mode: 'sandbox-demo',
    paidAt: timestamp
  };

  return {
    planId: plan.id,
    credits: (Number(base.credits) || 0) + (Number(plan.credits) || 0),
    removeWatermark: Boolean(base.removeWatermark || plan.removeWatermark),
    partnerDiscountPercent: Math.max(
      Number(base.partnerDiscountPercent) || 10,
      Number(plan.partnerDiscountPercent) || 10
    ),
    orders: [order, ...(Array.isArray(base.orders) ? base.orders : [])].slice(0, 20)
  };
}

export function consumeTryOnCredit(current, { bypass = false } = {}) {
  const base = current || createDefaultEntitlements();
  if (bypass) return base;
  return {
    ...base,
    credits: Math.max(0, (Number(base.credits) || 0) - 1)
  };
}
