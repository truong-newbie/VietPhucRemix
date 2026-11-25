import { useState, useCallback } from 'react';
import { loadJson, saveJson } from '../utils/storage';

const SAVED_OUTFITS_KEY = 'vpr_compare_outfits';

export function useSavedOutfits() {
  const [savedOutfits, setSavedOutfits] = useState(() => {
    const saved = loadJson(SAVED_OUTFITS_KEY, []);
    return Array.isArray(saved) ? saved.slice(0, 3) : [];
  });

  const saveForCompare = useCallback((item) => {
    if (!item || !item.outfit) return { ok: false, reason: 'invalid' };
    let status = { ok: true };
    setSavedOutfits((prev) => {
      if (prev.length >= 3) {
        // Thay thế phần tử cũ nhất nếu đã đủ 3 phương án A/B/C
        const next = [...prev.slice(1), { ...item, savedAt: Date.now(), id: `cmp-${Date.now()}` }];
        saveJson(SAVED_OUTFITS_KEY, next);
        return next;
      }
      const next = [...prev, { ...item, savedAt: Date.now(), id: `cmp-${Date.now()}` }];
      saveJson(SAVED_OUTFITS_KEY, next);
      return next;
    });
    return status;
  }, []);

  const removeSavedOutfit = useCallback((id) => {
    setSavedOutfits((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveJson(SAVED_OUTFITS_KEY, next);
      return next;
    });
  }, []);

  const clearSavedOutfits = useCallback(() => {
    setSavedOutfits([]);
    saveJson(SAVED_OUTFITS_KEY, []);
  }, []);

  return {
    savedOutfits,
    saveForCompare,
    removeSavedOutfit,
    clearSavedOutfits
  };
}
