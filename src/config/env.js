// Helper đọc biến môi trường client an toàn (không ném lỗi khi .env để trống)

export function getSupabaseConfig() {
  const url = (import.meta.env?.VITE_SUPABASE_URL || '').trim();
  const anonKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY || '').trim();
  return { url, anonKey };
}

export function hasSupabaseConfig() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && /^https?:\/\//i.test(url));
}

export function getAdminEmails() {
  const raw = (import.meta.env?.VITE_ADMIN_EMAILS || '').trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
