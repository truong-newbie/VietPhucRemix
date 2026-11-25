// Kịch bản 6 phân cảnh của Tour thuyết trình tự động 3 phút
export const TOUR_STEPS = [
  {
    id: 1,
    timeRange: '0:00 - 0:25',
    durationSec: 25,
    title: '1. Khởi đầu & Tư tưởng Di sản Dân tộc',
    voiceText:
      'Kính chào Ban Giám khảo cuộc thi HaUI Startup Mindset 2026. Chúng tôi là nhóm tác giả dự án Việt Phục Remix, nền tảng phối đồ di sản thông minh đa thế hệ với triết lý: Văn hóa là nội lực mạnh nhất của một dân tộc.',
    subtitle:
      '“Kính chào Ban Giám khảo cuộc thi HaUI Startup Mindset 2026. Chúng tôi là nhóm tác giả dự án VIỆT PHỤC REMIX – Nền tảng phối đồ di sản thông minh đa thế hệ với triết lý: Văn hóa là nội lực mạnh nhất của dân tộc.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('genz-tet');
      helpers.closeModals();
    }
  },
  {
    id: 2,
    timeRange: '0:25 - 0:55',
    durationSec: 30,
    title: '2. Động cơ Layered SVG Avatar & Màu sắc Ngũ Hành',
    voiceText:
      'Để giải quyết bài toán chi phí khởi nghiệp không đồng server, nhóm phát triển Động cơ Layered SVG Avatar chạy trực tiếp trên trình duyệt, cho phép đổi trang phục và màu sắc ngũ hành tương sinh tức thì với độ trễ không mili giây.',
    subtitle:
      '“Để giải quyết bài toán chi phí khởi nghiệp 0đ server, nhóm phát triển Động cơ Layered SVG Avatar chạy trực tiếp trên trình duyệt máy khách, đổi trang phục và màu sắc ngũ hành tương sinh tức thì với độ trễ 0ms.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.setGarment('ngu-than');
      helpers.setOuterColor('do-son');
      helpers.setBottomColor('trang-su');
      helpers.setFoot('sneaker-trang');
    }
  },
  {
    id: 3,
    timeRange: '0:55 - 1:30',
    durationSec: 35,
    title: '3. Culture Guard – Lá Chắn Kiểm Định Văn Hóa',
    voiceText:
      'Tính năng độc bản: Khi người dùng thử kết hợp sai lệch tại nơi tôn nghiêm, ví dụ đi lễ chùa mà mặc đồ hở hoặc đỏ rực, Lá chắn Culture Guard lập tức báo đèn đỏ cảnh báo, giải thích ý nghĩa cổ thư và cung cấp nút Tự Động Chuẩn Hóa một click.',
    subtitle:
      '“Tính năng độc bản: Khi người dùng thử kết hợp sai lệch tại nơi tôn nghiêm (đi chùa mặc đồ hở/đỏ rực), Lá chắn Culture Guard lập tức báo Đèn Đỏ cảnh báo, giải thích ý nghĩa cổ thư và cung cấp nút Tự Động Chuẩn Hóa 1-click.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('temple-violation');
      setTimeout(() => {
        helpers.autoFix({
          outerColorId: 'lam-cham',
          bottomLength: 'long',
          bottomColorId: 'trang-su'
        });
      }, 14000);
    }
  },
  {
    id: 4,
    timeRange: '1:30 - 2:05',
    durationSec: 35,
    title: '4. Harmony Score (0-100đ) & Xuất Lookbook Canvas',
    voiceText:
      'Thuật toán Harmony Score tự động chấm điểm hài hòa ngũ hành và thời tiết. Sau khi hoàn thành, hệ thống tự động kết xuất ảnh bưu thiếp Lookbook di sản độ phân giải cao kèm mã QR để chia sẻ hoặc đặt lịch tiệm thuê đối tác.',
    subtitle:
      '“Thuật toán Harmony Score chấm điểm hài hòa ngũ hành và thời tiết. Sau khi hoàn thành, hệ thống tự động render ảnh bưu thiếp Lookbook di sản 600×800 HD kèm mã QR để người dùng chia sẻ hoặc đặt lịch tiệm thuê đối tác.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('royal-wedding');
      setTimeout(() => {
        helpers.openLookbook();
      }, 5000);
    }
  },
  {
    id: 5,
    timeRange: '2:05 - 2:40',
    durationSec: 35,
    title: '5. Minh Bạch Hạn Chế & Lộ Trình Phát Triển 2026–2028',
    voiceText:
      'Tại trang Lộ trình, nhóm thẳng thắn nhìn nhận những giới hạn của bản MVP và vạch ra lộ trình gọi vốn ươm tạo rõ ràng: Tích hợp AI thử đồ từ ảnh thật người dùng, ứng dụng Mobile Flutter và mở rộng năm mươi tư dân tộc.',
    subtitle:
      '“Tại trang Lộ trình, nhóm thẳng thắn nhìn nhận hạn chế của bản MVP (đồ họa 2D, chưa có Virtual Try-On) và vạch ra lộ trình gọi vốn ươm tạo rõ ràng: Tích hợp AI thử đồ từ ảnh thật, Mobile App Flutter và mở rộng 54 dân tộc.”',
    action: (helpers) => {
      helpers.closeModals();
      helpers.setView('roadmap');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  {
    id: 6,
    timeRange: '2:40 - 3:00',
    durationSec: 20,
    title: '6. Lời Kêu Gọi Đồng Hành & Kết Luận',
    voiceText:
      'Nhóm kính mong nhận được sự đồng hành quý báu từ Ban Giám khảo và Trường Đại học Công nghiệp Hà Nội để cùng lan tỏa thông điệp: Mặc đẹp, mặc đúng, giữ trọn hồn thiêng dân tộc! Xin trân trọng cảm ơn.',
    subtitle:
      '“Nhóm kính mong nhận được sự đồng hành quý báu từ Ban Giám khảo và Trường Đại học Công nghiệp Hà Nội để sớm đưa dự án vào thực tiễn: Mặc đẹp – Mặc đúng – Giữ trọn hồn thiêng dân tộc! Xin trân trọng cảm ơn.”',
    action: (helpers) => {
      helpers.setView('roadmap');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
];
