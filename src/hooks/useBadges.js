import { useState, useCallback } from 'react';
import { loadJson, saveJson } from '../utils/storage';

const BADGES_STORAGE_KEY = 'vpr_earned_badges';

export function useBadges() {
  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = loadJson(BADGES_STORAGE_KEY, []);
    return Array.isArray(saved) ? saved : [];
  });

  const earnBadge = useCallback((garmentId) => {
    if (!garmentId) return;
    setEarnedBadges((prev) => {
      if (prev.includes(garmentId)) return prev;
      const next = [...prev, garmentId];
      saveJson(BADGES_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const hasBadge = useCallback(
    (garmentId) => earnedBadges.includes(garmentId),
    [earnedBadges]
  );

  return {
    earnedBadges,
    earnBadge,
    hasBadge,
    totalEarned: earnedBadges.length
  };
}
