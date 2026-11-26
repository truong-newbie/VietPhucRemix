-- Schema cơ sở dữ liệu Việt Phục Remix v2 (Supabase PostgreSQL + RLS)
-- Chạy toàn bộ file này 1 lần trong Supabase -> SQL Editor -> New Query

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.saved_outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_key TEXT NOT NULL,
  outfit JSONB NOT NULL,
  harmony_score INT DEFAULT 0,
  culture_status TEXT DEFAULT 'green',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, client_key)
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  garment_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, garment_id)
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code TEXT NOT NULL UNIQUE,
  partner_id TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('thue', 'may')),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  size TEXT DEFAULT 'M',
  note TEXT DEFAULT '',
  share_url TEXT DEFAULT '',
  garment_id TEXT DEFAULT '',
  pdp_consent BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  props JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.study_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  age_group TEXT NOT NULL,
  pre_score INT NOT NULL,
  post_score INT NOT NULL,
  sus_answers JSONB NOT NULL,
  sus_score NUMERIC(5,2) NOT NULL,
  feedback TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rule_reviews (
  rule_id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'verified',
  verified_source TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  notes TEXT DEFAULT '',
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- BẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rule_reviews ENABLE ROW LEVEL SECURITY;

-- Policies cho dữ liệu cá nhân (chỉ chủ sở hữu)
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
CREATE POLICY "Users manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users manage own outfits" ON public.saved_outfits;
CREATE POLICY "Users manage own outfits" ON public.saved_outfits
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own badges" ON public.user_badges;
CREATE POLICY "Users manage own badges" ON public.user_badges
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Policies cho Đặt lịch, Analytics & Khảo sát: khách ẩn danh được phép INSERT, chặn đọc trái phép SĐT khách
DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings;
CREATE POLICY "Public insert bookings" ON public.bookings
  FOR INSERT WITH CHECK (pdp_consent = TRUE);

DROP POLICY IF EXISTS "Public insert analytics" ON public.analytics_events;
CREATE POLICY "Public insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public insert study responses" ON public.study_responses;
CREATE POLICY "Public insert study responses" ON public.study_responses
  FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Public read study responses for evidence chart" ON public.study_responses;
CREATE POLICY "Public read study responses for evidence chart" ON public.study_responses
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public read verified rule reviews" ON public.rule_reviews;
CREATE POLICY "Public read verified rule reviews" ON public.rule_reviews
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Authenticated advisors upsert rule reviews" ON public.rule_reviews;
CREATE POLICY "Authenticated advisors upsert rule reviews" ON public.rule_reviews
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Bảng Đơn thanh toán VietQR & Số dư Credit AI (sẵn sàng đấu nối webhook SePay / PayOS)
CREATE TABLE IF NOT EXISTS public.payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  plan_id TEXT NOT NULL,
  amount_vnd INT NOT NULL,
  credits_granted INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'sandbox_paid', 'cancelled')),
  provider TEXT NOT NULL DEFAULT 'vietqr-sandbox',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits INT NOT NULL DEFAULT 2,
  plan_id TEXT NOT NULL DEFAULT 'free',
  remove_watermark BOOLEAN NOT NULL DEFAULT FALSE,
  partner_discount_percent INT NOT NULL DEFAULT 10,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own payment orders" ON public.payment_orders;
CREATE POLICY "Users read own payment orders" ON public.payment_orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own credits" ON public.user_credits;
CREATE POLICY "Users read own credits" ON public.user_credits
  FOR SELECT USING (auth.uid() = user_id);

-- Cấp quyền mức bảng cho role anon & authenticated (bắt buộc kèm RLS trên Supabase mới)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles, public.saved_outfits, public.user_badges, public.rule_reviews TO authenticated;
GRANT SELECT ON public.payment_orders, public.user_credits TO authenticated;
GRANT INSERT ON public.bookings, public.analytics_events, public.study_responses TO anon, authenticated;
GRANT SELECT ON public.study_responses, public.rule_reviews TO anon, authenticated;
