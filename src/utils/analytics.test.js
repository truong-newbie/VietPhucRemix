import { describe, it, expect, beforeEach } from 'vitest';
import {
  track,
  trackFirstCompleteOutfit,
  setAnalyticsTourMode,
  resetAnalyticsSessionForTest
} from './analytics';

describe('analytics', () => {
  beforeEach(() => {
    resetAnalyticsSessionForTest();
  });

  it('tracks first_complete_outfit only once per session and suppresses during tour', () => {
    expect(trackFirstCompleteOutfit(false)).toBeNull();
    const first = trackFirstCompleteOutfit(true);
    expect(first?.event_name).toBe('first_complete_outfit');
    expect(first?.props.elapsedSeconds).toBeGreaterThanOrEqual(1);
    expect(trackFirstCompleteOutfit(true)).toBeNull();

    setAnalyticsTourMode(true);
    expect(track('lookbook_export')).toBeNull();
  });
});
