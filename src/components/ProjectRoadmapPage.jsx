import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Users,
  Compass,
  Calendar,
  Award,
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Lightbulb
} from 'lucide-react';

export function ProjectRoadmapPage({ onBackToStudio }) {
  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C241D] py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#8B1A1A] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Back Bar */}
        <div className="flex items-center justify-between border-b border-[#DECDB8] pb-4">
          <button
            onClick={onBackToStudio}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Thử Đồ Tương Tác (Studio)</span>
          </button>

          <span className="text-xs text-gray-500 italic hidden sm:inline">
            Hồ sơ Minh bạch Năng lực Dự án • HaUI Startup Mindset 2026
          </span>
        </div>

        {/* Hero Banner: Tầm nhìn & Triết lý */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1D2440] via-[#165B66] to-[#1F6F5C] text-white p-6 sm:p-10 border-2 border-[#C9A227] shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F9D423] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BÁO CÁO THỰC CHỨNG & LỘ TRÌNH KHỞI NGHIỆP</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white tracking-normal">
              Bản Web MVP Đã Làm Được Gì &amp;{' '}
              <span className="text-[#F9D423]">Lộ Trình Tương Lai Đi Về Đâu?</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              Một góc nhìn chân thực, minh bạch từ đội ngũ sinh viên CNTT – HaUI: Không nói quá năng lực, nhìn thẳng vào các hạn chế kỹ thuật hiện tại, và vạch ra lộ trình khả thi để đưa dự án từ cuộc thi bước ra cuộc sống.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/15 text-white font-medium">
                Dự án: Việt Phục Remix
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/15 text-white font-medium">
                Trưởng nhóm: Đỗ Đăng Trường
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#C9A227]/30 text-[#F9D423] font-bold border border-[#C9A227]">
                Mục tiêu: Top 1 HaUI Mindset 2026
              </span>
            </div>
          </div>
        </div>

        {/* PHẦN 1: BẢN WEB MVP HIỆN TẠI ĐÃ HOÀN THÀNH ĐƯỢC GÌ? */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Phần 1 • Hiện trạng sản phẩm
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D2440] tracking-normal">
                Bản Web MVP Hiện Tại Đã Làm Được Những Gì? (Thực tế 100%)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Đạt 100% đề thi Audition */}
            <div className="bg-white rounded-2xl p-5 border border-[#DECDB8] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#8B1A1A]">
                <Target className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base text-[#1D2440]">1. Đáp ứng 100% Đề bài Audition của BTC</h3>
              </div>
              <ul className="text-xs text-gray-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Chọn nhóm trang phục &amp; bối cảnh:</strong> 5 dòng cổ phục tiêu biểu (Ngũ thân, Tứ thân, Nhật Bình, Áo dài, Bà ba) và 10 sự kiện bối cảnh văn hóa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Tùy biến đa dạng:</strong> Phối màu áo, màu quần, thắt lưng ngũ sắc và chọn phụ kiện đầu, cầm tay, giày guốc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Thẻ thông tin văn hóa ngắn:</strong> Cửa sổ <em>Thẻ văn hóa 60 giây</em> trích nguồn uy tín về lịch sử và cấu tạo nếp áo cha ông.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Động cơ Layered SVG 0đ server */}
            <div className="bg-white rounded-2xl p-5 border border-[#DECDB8] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#1F6F5C]">
                <Cpu className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base text-[#1D2440]">2. Động cơ Layered SVG Avatar (0đ Chi Phí Server)</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Đội ngũ kỹ thuật giải bài toán kinh tế thông minh: Thay vì sử dụng server GPU render AI đắt đỏ ngốn hàng nghìn USD, nhóm xây dựng <strong>Layered SVG Engine</strong> chạy trực tiếp trên trình duyệt máy khách (Client-side).
              </p>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DBCE] text-xs text-[#664422] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Lợi ích kinh tế vượt trội:</span>
                </div>
                <p>• Tải tức thì dưới 1 giây, độ trễ đổi màu 0ms.</p>
                <p>• Chi phí máy chủ trong giai đoạn ươm tạo: <strong>0 đồng</strong>.</p>
              </div>
            </div>

            {/* Box 3: Lá chắn Văn hóa Culture Guard */}
            <div className="bg-white rounded-2xl p-5 border border-[#DECDB8] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#8B1A1A]">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base text-[#1D2440]">3. Culture Guard – Lá Chắn Bản Sắc Tự Động</h3>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Tính năng độc bản giúp dự án vượt lên các app phối đồ thông thường. Hệ thống luật số hóa quan hệ ma trận giữa <code>[Áo + Sự kiện + Màu + Phụ kiện]</code>:
              </p>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  🟢 Đèn Xanh<br /><span className="text-[9px] font-normal">Khen ngợi sáng tạo</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  🟡 Đèn Vàng<br /><span className="text-[9px] font-normal">Lưu ý bản sắc</span>
                </div>
                <div className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                  🔴 Đèn Đỏ<br /><span className="text-[9px] font-normal">Cảnh báo sai lệch</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                Đặc biệt tích hợp nút <strong>[Tự Động Chuẩn Hóa 1-Click]</strong> để đưa bộ đồ về đúng thuần phong mỹ tục ngay tức khắc.
              </p>
            </div>

            {/* Box 4: Harmony Score & Xuất Lookbook Canvas */}
            <div className="bg-white rounded-2xl p-5 border border-[#DECDB8] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#C9A227]">
                <Layers className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base text-[#1D2440]">4. Chấm Điểm Ngũ Sắc &amp; Xuất Lookbook Canvas</h3>
              </div>
              <ul className="text-xs text-gray-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                  <span><strong>Thuật toán Harmony Score (0–100):</strong> Đánh giá mức độ tương sinh ngũ hành (Kim, Mộc, Thủy, Hỏa, Thổ) và độ phù hợp thời tiết sự kiện.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                  <span><strong>Xuất Lookbook Canvas 600×800 HD:</strong> Tự sinh bưu thiếp văn hóa cá nhân hóa kèm mã QR, sẵn sàng để chia sẻ lên TikTok / Facebook.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0" />
                  <span><strong>Giải bài toán Đa thế hệ:</strong> Chuyển đổi linh hoạt giữa Gen Z (năng động) và Gia đình 30+ (sang trọng, lễ cưới).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PHẦN 2: THẲNG THẮN NHÌN NHẬN HẠN CHẾ (NÓI THẬT) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                Phần 2 • Nhìn thẳng vào thực tế
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D2440] tracking-normal">
                Những Hạn Chế Hiện Tại Cần Thẳng Thắn Thừa Nhận (Nói Thật)
              </h2>
            </div>
          </div>

          <div className="bg-[#FAF3DD]/80 rounded-2xl p-6 border-2 border-amber-300 space-y-4 text-xs sm:text-sm text-gray-800">
            <p className="leading-relaxed font-medium text-amber-950">
              Là những sinh viên công nghệ có tư duy khởi nghiệp nghiêm túc, nhóm không tô hồng sản phẩm hay ngộ nhận rằng bản MVP này đã hoàn hảo. Đây là các điểm hạn chế kỹ thuật và thị trường mà nhóm hoàn toàn nhận thức rõ:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
                <span className="font-bold text-rose-800 block text-xs">
                  ⚠️ 1. Đồ họa Avatar mới dừng ở mức Vector 2D cách điệu
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Hiện tại, avatar thể hiện phom dáng và màu sắc theo phong cách vector 2D tinh gọn. Nó chưa thể hiện được nếp nhăn vải thực tế (cloth simulation) và chưa phải là mô hình 3D photorealistic chân thực như người thật.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
                <span className="font-bold text-rose-800 block text-xs">
                  ⚠️ 2. Chưa tích hợp AI thử đồ khuôn mặt cá nhân (Virtual Try-on)
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Bản MVP hiện tại cho phép chọn nhân vật đại diện nam/nữ mẫu, chưa hỗ trợ người dùng upload ảnh chân dung thật để AI ghép mặt và dáng người vì tính năng này đòi hỏi hạ tầng GPU Cloud có kinh phí duy trì.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
                <span className="font-bold text-rose-800 block text-xs">
                  ⚠️ 3. Bộ quy tắc Culture Guard vận hành theo luật Rule-based
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Hệ thống đang chạy trên bộ ~200 quy tắc số hóa logic. Dù xử lý chính xác các trường hợp cơ bản, hệ thống cần được bổ sung thêm mô hình đồ thị tri thức (Knowledge Graph) và cố vấn lịch sử chuyên sâu từ các viện nghiên cứu.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-1.5">
                <span className="font-bold text-rose-800 block text-xs">
                  ⚠️ 4. Mạng lưới tiệm thuê đối tác mới ở dạng kết nối thử nghiệm
                </span>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Các đối tác trên app hiện dừng lại ở dữ liệu mẫu có thật để chứng minh luồng kinh doanh (Business Flow). Nhóm chưa tích hợp cổng thanh toán trực tuyến (VNPAY/Momo) và chưa ký hợp đồng thương mại độc quyền chính thức.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PHẦN 3: LỘ TRÌNH PHÁT TRIỂN CHI TIẾT (ACTIONABLE ROADMAP) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Phần 3 • Lộ trình bứt phá
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D2440] tracking-normal">
                Sau Này Sẽ Phát Triển Những Gì? (Kế hoạch 2026 – 2028)
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#1F6F5C] border border-[#DECDB8] shadow-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Giai đoạn 1 (Q4/2026)
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                    Hoàn Thiện Thử Nghiệm &amp; Ban Cố Vấn Văn Hóa
                  </h4>
                </div>
                <span className="text-xs text-gray-500 font-medium">Ngay sau cuộc thi Mindset</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5 pl-4 list-disc leading-relaxed">
                <li>Khảo sát trải nghiệm thực tế với <strong>300–500 học sinh, sinh viên và phụ huynh</strong> tại Hà Nội.</li>
                <li>Thành lập Hội đồng Cố vấn Văn hóa: Mời các nhà nghiên cứu trang phục truyền thống, nghệ nhân dệt lụa và đại diện Bảo tàng tham gia kiểm định bộ quy tắc Culture Guard.</li>
                <li>Ký kết biên bản ghi nhớ hợp tác (MOU) với <strong>05 tiệm thuê/may đo cổ phục đầu tiên</strong> quanh khu vực phố cổ Hà Nội.</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#C9A227] border border-[#DECDB8] shadow-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF3DD] text-[#8C5E3B]">
                    Giai đoạn 2 (Q1 – Q2/2027)
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                    Tích Hợp AI Virtual Try-On &amp; Ứng Dụng Di Động Native (Mobile App)
                  </h4>
                </div>
                <span className="text-xs text-gray-500 font-medium">Vòng Ươm tạo &amp; Gọi vốn Hạt giống</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5 pl-4 list-disc leading-relaxed">
                <li><strong>Nâng cấp AI Virtual Try-On:</strong> Nghiên cứu áp dụng mô hình Diffusion / GAN tối ưu hóa cho trang phục nhiều lớp Việt Nam, cho phép ghép khuôn mặt và vóc dáng người dùng thật.</li>
                <li>Phát triển ứng dụng di động đa nền tảng <strong>Flutter</strong> (iOS &amp; Android) để tối ưu hóa thao tác chạm vuốt và chụp ảnh camera trực tiếp.</li>
                <li>Tích hợp cổng thanh toán trực tuyến (VNPAY, Momo, Apple Pay) và hệ thống đặt lịch thuê đồ tự động cho chủ tiệm.</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-2xl p-5 border-l-4 border-l-[#8B1A1A] border border-[#DECDB8] shadow-sm space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                    Giai đoạn 3 (Q3/2027 – 2028)
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#1D2440]">
                    Family Lookbook Thông Minh &amp; Mở Rộng 54 Dân Tộc Việt Nam
                  </h4>
                </div>
                <span className="text-xs text-gray-500 font-medium">Thương mại hóa toàn quốc &amp; Quốc tế</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5 pl-4 list-disc leading-relaxed">
                <li><strong>Family Lookbook Engine:</strong> AI tự động gợi ý phối màu đồng điệu cho cả gia đình 3 thế hệ (Ông bà, Cha mẹ, Con cái) theo ngũ hành tương sinh cho ngày mừng thọ, đám cưới.</li>
                <li><strong>Số hóa y phục 54 dân tộc:</strong> Mở rộng từ trang phục người Kinh sang các di sản rực rỡ của đồng bào H'Mông, Thái, Dao, Chăm, Khmer...</li>
                <li><strong>Đa ngôn ngữ (Anh, Pháp, Nhật):</strong> Định hướng quảng bá văn hóa Việt Nam ra toàn cầu cho khách du lịch quốc tế trước khi đến Việt Nam.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PHẦN 4: LỜI KÊU GỌI & ĐỀ XUẤT HỖ TRỢ TỪ BGK / NHÀ TRƯỜNG */}
        <section className="bg-gradient-to-r from-[#FAF3DD] to-[#F4EFE6] rounded-3xl p-6 sm:p-8 border-2 border-[#C9A227] shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-[#8B1A1A]" />
            <h3 className="font-bold text-lg sm:text-xl text-[#1D2440] tracking-normal">
              Dự Án Cần Gì Ở Ban Giám Khảo &amp; Trường Đại Học Công Nghiệp Hà Nội?
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Sinh viên CNTT có thế mạnh làm chủ công nghệ, nhưng để một ý tưởng khởi nghiệp sống sót và sinh lời trên thị trường, nhóm rất cần sự nâng đỡ và đồng hành từ Hội đồng Ban Giám khảo và Nhà trường:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-[#DECDB8] shadow-sm">
              <span className="font-bold text-[#8B1A1A] block mb-1">1. Cố vấn Mô hình Kinh doanh</span>
              <p className="text-gray-600">Được các thầy cô Khoa Quản lý Kinh doanh hướng dẫn định giá hoa hồng B2B và chiến lược đàm phán hợp đồng đối tác.</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#DECDB8] shadow-sm">
              <span className="font-bold text-[#1F6F5C] block mb-1">2. Không gian Ươm tạo HaUI</span>
              <p className="text-gray-600">Hỗ trợ không gian làm việc tại HaUI Innovation Hub và cơ hội tiếp cận Quỹ Hỗ trợ Khởi nghiệp Sáng tạo Sinh viên.</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#DECDB8] shadow-sm">
              <span className="font-bold text-[#1D2440] block mb-1">3. Kết nối Mạng lưới Văn hóa</span>
              <p className="text-gray-600">Giới thiệu dự án tham gia các ngày hội văn hóa, festival sinh viên Thủ đô để có ngay tập 1.000 người dùng đầu tiên.</p>
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DECDB8]">
            <div className="text-xs text-gray-600">
              <span className="font-bold text-[#8B1A1A]">Trưởng nhóm Đỗ Đăng Trường:</span> “Nhóm cam kết không dừng lại ở bài thi lý thuyết, mà quyết tâm đưa Việt Phục Remix trở thành cầu nối bản sắc cho người trẻ.”
            </div>
            <button
              onClick={onBackToStudio}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] transition shadow-md shrink-0 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vào Thử Nghiệm Ngay Bản Web</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

