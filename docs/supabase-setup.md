# Hướng dẫn Cấu hình Supabase cho Việt Phục Remix

1. Tạo project miễn phí tại [supabase.com](https://supabase.com).
2. Mở **SQL Editor → New Query**, dán toàn bộ nội dung file `supabase/schema.sql` và nhấn **Run**.
3. Trong **Authentication → Providers**, bật **Google** (tùy chọn, nếu muốn cho người dùng đồng bộ tủ đồ giữa các thiết bị).
4. Vào **Project Settings → API**, sao chép `Project URL` và `anon public` key điền vào file `.env`:
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
   - `VITE_ADMIN_EMAILS=email_co_van@example.com`
5. Nếu chưa điền `.env`, ứng dụng vẫn tự động chạy ở chế độ **Offline-First (LocalStorage)** mà không phát sinh lỗi.
