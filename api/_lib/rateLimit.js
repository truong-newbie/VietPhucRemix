// Bộ giới hạn lượt gọi theo IP (In-memory sliding window) + mã mở khóa Giám khảo JUDGE_PASSCODE

const buckets = new Map();

export function getClientIp(req) {
  const xff = req?.headers?.['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  return req?.socket?.remoteAddress || '127.0.0.1';
}

export function checkRateLimit({
  key,
  limit = 5,
  windowMs = 24 * 60 * 60 * 1000,
  passcode = '',
  expectedPasscode = '',
  now = Date.now()
}) {
  if (expectedPasscode && passcode && passcode.trim() === expectedPasscode.trim()) {
    return { allowed: true, remaining: 999, isJudge: true };
  }

  const timestamps = (buckets.get(key) || []).filter((ts) => now - ts < windowMs);
  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return { allowed: false, remaining: 0, isJudge: false };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return { allowed: true, remaining: Math.max(0, limit - timestamps.length), isJudge: false };
}

export function resetRateLimitBuckets() {
  buckets.clear();
}
