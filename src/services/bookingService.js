// Dịch vụ Đặt lịch Thuê/May B2B2C chuẩn Nghị định 13/2023/NĐ-CP & Offline-first fallback
import { getSupabaseClient } from './supabase';
import { loadJson, saveJson } from '../utils/storage';

export const LOCAL_BOOKINGS_KEY = 'vpr_pending_bookings';
export const BOOKING_HISTORY_KEY = 'vpr_booking_history';
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export function getLocalBookingHistory() {
  const list = loadJson(BOOKING_HISTORY_KEY, []);
  return Array.isArray(list) ? list : [];
}

function appendBookingHistory(entry) {
  const current = getLocalBookingHistory().filter((item) => item.booking_code !== entry.booking_code);
  saveJson(BOOKING_HISTORY_KEY, [entry, ...current].slice(0, 20));
}

export function removeLocalBooking(bookingCode) {
  const next = getLocalBookingHistory().filter((item) => item.booking_code !== bookingCode);
  saveJson(BOOKING_HISTORY_KEY, next);
  return next;
}

export function validateBookingPayload(input = {}, todayStr = new Date().toISOString().slice(0, 10)) {
  const errors = [];
  const name = (input.customerName || '').trim();
  const phone = (input.phone || '').replace(/[\s.-]/g, '');
  const pickupDate = (input.pickupDate || '').trim();

  if (name.length < 2) {
    errors.push('Họ tên phải có ít nhất 2 ký tự.');
  }
  if (!VN_PHONE_REGEX.test(phone)) {
    errors.push('Số điện thoại Việt Nam không hợp lệ (ví dụ: 0912345678 hoặc +84912345678).');
  }
  if (!pickupDate || pickupDate < todayStr) {
    errors.push('Ngày nhận đồ phải từ hôm nay trở đi.');
  }
  if (!input.pdpConsent) {
    errors.push('Vui lòng đồng ý xử lý dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.');
  }

  return {
    valid: errors.length === 0,
    errors,
    normalizedPhone: phone
  };
}

export function generateBookingCode(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VPR-${yy}${mm}${dd}-${rand}`;
}

export async function submitBooking(payload) {
  const check = validateBookingPayload(payload);
  if (!check.valid) {
    return { ok: false, errors: check.errors };
  }

  const bookingCode = generateBookingCode();
  const record = {
    booking_code: bookingCode,
    partner_id: payload.partnerId,
    partner_name: payload.partnerName,
    service_type: payload.serviceType === 'may' ? 'may' : 'thue',
    customer_name: payload.customerName.trim(),
    phone: check.normalizedPhone,
    pickup_date: payload.pickupDate,
    size: payload.size || 'M',
    note: (payload.note || '').trim(),
    share_url: payload.shareUrl || '',
    garment_id: payload.garmentId || '',
    pdp_consent: true
  };

  const historyEntry = {
    ...record,
    created_at: new Date().toISOString()
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('bookings').insert(record);
      if (!error) {
        appendBookingHistory({ ...historyEntry, storageMode: 'supabase' });
        return { ok: true, bookingCode, storageMode: 'supabase' };
      }
    } catch {
      // Fallback sang localStorage nếu mất mạng
    }
  }

  const existing = loadJson(LOCAL_BOOKINGS_KEY, []);
  saveJson(LOCAL_BOOKINGS_KEY, [...(Array.isArray(existing) ? existing : []), historyEntry]);
  appendBookingHistory({ ...historyEntry, storageMode: 'local' });
  return { ok: true, bookingCode, storageMode: 'local' };
}
