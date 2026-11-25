import { describe, it, expect } from 'vitest';
import { recommendOutfits } from './recommendEngine';
import { EVENTS_DATA } from '../data/eventsData';

describe('recommendEngine', () => {
  it('returns 3 non-red recommendations for all 10 events in < 50ms each', () => {
    for (const ev of EVENTS_DATA) {
      const start = performance.now();
      const picks = recommendOutfits({ eventId: ev.id, gender: 'female', mode: 'genz' });
      const elapsed = performance.now() - start;

      expect(picks.length).toBe(3);
      expect(picks.every((p) => p.cultureStatus !== 'red')).toBe(true);
      expect(elapsed).toBeLessThan(50);
    }
  });

  it('is deterministic for identical inputs', () => {
    const a = recommendOutfits({ eventId: 'tet-xuan', gender: 'male', mode: 'family' });
    const b = recommendOutfits({ eventId: 'tet-xuan', gender: 'male', mode: 'family' });
    expect(a).toEqual(b);
  });
});
