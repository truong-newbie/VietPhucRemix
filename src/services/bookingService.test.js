import { describe, it, expect, vi } from 'vitest';
import { validateBookingPayload, generateBookingCode, submitBooking } from './bookingService';

vi.mock('./supabase', () => ({
  getSupabaseClient: () => null
}));

describe('bookingService', () => {
  it('validates Vietnamese phone numbers and Decree 13 consent', () => {
    const ok = validateBookingPayload(
      {
        customerName: 'Nguyễn Minh Anh',
        phone: '0912 345 678',
        pickupDate: '2026-12-01',
        pdpConsent: true
      },
      '2026-11-25'
    );
    expect(ok.valid).toBe(true);
    expect(ok.normalizedPhone).toBe('0912345678');

    const bad = validateBookingPayload(
      {
        customerName: 'A',
        phone: '12345',
        pickupDate: '2020-01-01',
        pdpConsent: false
      },
      '2026-11-25'
    );
    expect(bad.valid).toBe(false);
    expect(bad.errors.length).toBe(4);
  });

  it('generates VPR booking code and falls back cleanly when Supabase env is absent', async () => {
    expect(generateBookingCode(new Date('2026-11-25T10:00:00Z'))).toMatch(/^VPR-261125-[A-Z0-9]{4}$/);

    const res = await submitBooking({
      partnerId: 'dong-phong',
      partnerName: 'Đông Phong Cổ Phục',
      serviceType: 'thue',
      customerName: 'Trần Văn Nam',
      phone: '+84987654321',
      pickupDate: '2099-01-01',
      pdpConsent: true
    });
    expect(res.ok).toBe(true);
    expect(res.storageMode).toBe('local');
    expect(res.bookingCode).toMatch(/^VPR-/);
  });
});
