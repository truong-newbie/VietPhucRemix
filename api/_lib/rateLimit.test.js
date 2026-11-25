import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimitBuckets } from './rateLimit';

describe('rateLimit', () => {
  beforeEach(() => {
    resetRateLimitBuckets();
  });

  it('blocks requests after exceeding limit', () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit({ key: 'ip:1.2.3.4', limit: 5, now: 1000 + i }).allowed).toBe(true);
    }
    const blocked = checkRateLimit({ key: 'ip:1.2.3.4', limit: 5, now: 2000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('bypasses limit when valid JUDGE_PASSCODE is supplied', () => {
    for (let i = 0; i < 6; i++) {
      const res = checkRateLimit({
        key: 'ip:9.9.9.9',
        limit: 2,
        passcode: 'HAUI2026',
        expectedPasscode: 'HAUI2026'
      });
      expect(res.allowed).toBe(true);
      expect(res.isJudge).toBe(true);
    }
  });
});
