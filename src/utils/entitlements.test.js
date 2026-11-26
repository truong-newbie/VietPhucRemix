import { describe, it, expect } from 'vitest';
import {
  createDefaultEntitlements,
  applyPurchasedPlan,
  consumeTryOnCredit,
  INITIAL_FREE_CREDITS
} from './entitlements';
import { PRICING_PLANS, buildVietQrUrl } from '../data/pricingData';

describe('entitlements & pricing', () => {
  it('starts with 2 free credits, adds plan credits on purchase, and upgrades discount', () => {
    const start = createDefaultEntitlements();
    expect(start.credits).toBe(INITIAL_FREE_CREDITS);
    expect(start.removeWatermark).toBe(false);
    expect(start.partnerDiscountPercent).toBe(10);

    const familyPlan = PRICING_PLANS.find((p) => p.id === 'pro-family');
    const upgraded = applyPurchasedPlan(start, familyPlan, 'VPRPAY1126ABCD');
    expect(upgraded.credits).toBe(INITIAL_FREE_CREDITS + 35);
    expect(upgraded.removeWatermark).toBe(true);
    expect(upgraded.partnerDiscountPercent).toBe(15);
    expect(upgraded.orders[0].orderCode).toBe('VPRPAY1126ABCD');
  });

  it('decrements credit on real try-on unless bypassed by judge passcode', () => {
    const start = createDefaultEntitlements();
    const bypassed = consumeTryOnCredit(start, { bypass: true });
    expect(bypassed.credits).toBe(INITIAL_FREE_CREDITS);

    const spent = consumeTryOnCredit(start);
    expect(spent.credits).toBe(INITIAL_FREE_CREDITS - 1);
  });

  it('builds valid VietQR NAPAS URL with amount and transfer note', () => {
    const url = buildVietQrUrl({
      bankId: 'MB',
      accountNo: '0123456789',
      amount: 29000,
      addInfo: 'VPRPAY1234'
    });
    expect(url).toContain('https://img.vietqr.io/image/MB-0123456789-compact2.png');
    expect(url).toContain('amount=29000');
    expect(url).toContain('addInfo=VPRPAY1234');
  });
});
