import { useState, useCallback } from 'react';
import { loadJson, saveJson } from '../utils/storage';
import {
  createDefaultEntitlements,
  applyPurchasedPlan,
  consumeTryOnCredit
} from '../utils/entitlements';
import { generatePaymentCode } from '../data/pricingData';

const ENTITLEMENTS_KEY = 'vpr_entitlements_v1';

export function useEntitlements() {
  const [state, setState] = useState(() => {
    const saved = loadJson(ENTITLEMENTS_KEY, null);
    return saved && typeof saved === 'object' ? { ...createDefaultEntitlements(), ...saved } : createDefaultEntitlements();
  });

  const purchasePlanDemo = useCallback((plan, customOrderCode) => {
    const code = customOrderCode || generatePaymentCode();
    setState((prev) => {
      const next = applyPurchasedPlan(prev, plan, code);
      saveJson(ENTITLEMENTS_KEY, next);
      return next;
    });
    return code;
  }, []);

  const spendCredit = useCallback((options = {}) => {
    setState((prev) => {
      const next = consumeTryOnCredit(prev, options);
      saveJson(ENTITLEMENTS_KEY, next);
      return next;
    });
  }, []);

  return {
    ...state,
    isPro: state.planId !== 'free',
    purchasePlanDemo,
    spendCredit
  };
}
