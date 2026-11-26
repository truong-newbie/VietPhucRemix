import { describe, it, expect } from 'vitest';
import { validateColabUrl } from './colabTryOn.js';

describe('colabTryOn SSRF whitelist', () => {
  it('accepts valid HTTPS trycloudflare.com tunnel URLs and strips trailing slashes', () => {
    expect(validateColabUrl('https://vietphuc-demo-123.trycloudflare.com/')).toBe(
      'https://vietphuc-demo-123.trycloudflare.com'
    );
    expect(validateColabUrl('  https://abc.trycloudflare.com/try-on  ')).toBe(
      'https://abc.trycloudflare.com'
    );
  });

  it('rejects non-HTTPS, localhost, internal IPs, ports, and spoofed domains', () => {
    expect(validateColabUrl('http://abc.trycloudflare.com')).toBeNull();
    expect(validateColabUrl('https://localhost:8000')).toBeNull();
    expect(validateColabUrl('https://127.0.0.1')).toBeNull();
    expect(validateColabUrl('https://169.254.169.254/latest/meta-data')).toBeNull();
    expect(validateColabUrl('https://trycloudflare.com.evil.com')).toBeNull();
    expect(validateColabUrl('https://abc.trycloudflare.com:8443')).toBeNull();
    expect(validateColabUrl('')).toBeNull();
  });
});
