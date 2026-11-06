// Động cơ luật kiểm định Văn hóa Culture Guard
// Bộ quy tắc quan hệ số hóa: Garment + Event + Color + Accessories

export const CULTURE_RULES = [
  // ==================== CẢNH BÁO ĐỎ (CRITICAL VIOLATION) ====================
  {
    id: 'rule-red-temple-indecent',
    level: 'red',
    title: 'Sai lệch văn hóa chốn tôn nghiêm!',
    check: (state) => {
      // Khi đi lễ chùa hoặc nơi tôn nghiêm nhưng chọn trang phục quá ngắn hoặc màu sắc kiêng kỵ
      return state.eventId === 'le-chua' && (state.bottomLength === 'short' || state.outerColorId === 'do-son');
    },
    message: 'Nơi tôn nghiêm và cửa Thiền đòi hỏi sự thanh tịnh, trang nghiêm và khiêm nhường. Không nên mặc màu đỏ son rực rỡ hoặc phối trang phục ngắn gây phản cảm.',
    quote: '“Y phục nhập tự nghi đoan chính, kỵ sắc quá xích, kỵ đoản y vô lễ.” — Quy phạm y phục thiền môn.',
    suggestion: 'Chuyển sang gam màu Lam Chàm, Xanh Lục Bảo hoặc Nâu Non mộc mạc; đảm bảo vạt áo dài quá gối và quần dài kín đáo.',
    autoFix: {
      outerColorId: 'lam-cham',
      bottomLength: 'long',
      bottomColorId: 'trang-su'
    }
  },
  {
    id: 'rule-red-wedding-mourning-color',
    level: 'red',
    title: 'Kỵ màu hỷ sự trong đám cưới & mừng thọ!',
    check: (state) => {
      // Đi đám cưới hoặc tiệc sum họp nhưng mặc tuyền một màu đen hoặc màu xám tro tang tóc
      return (state.eventId === 'dam-cuoi' || state.eventId === 'gia-dinh-sum-hop') && state.outerColorId === 'den-tuyen';
    },
    message: 'Theo phong tục cổ truyền người Việt, ngày đại hỷ và mừng thọ kiêng kỵ mặc cả cây màu đen tuyền vì màu đen gắn liền với tang chế, u buồn.',
    quote: '“Hỷ sự dĩ xích hoàng vi cát, tối kỵ huyền hắc chi sắc.” — Phong tục cưới hỏi truyền thống Việt Nam.',
    suggestion: 'Hãy chọn Đỏ Son Di Sản, Hoàng Thổ Vua Ban hoặc Hồng Đào để mang lại hỷ khí, phúc lộc cho gia đình.',
    autoFix: {
      outerColorId: 'do-son',
      beltColorId: 'hoang-tho'
    }
  },
  {
    id: 'rule-red-cross-region-mismatch',
    level: 'red',
    title: 'Nhầm lẫn bản sắc vùng miền nghiêm trọng!',
    check: (state) => {
      // Áo bà ba Nam Bộ lại đội nón quai thao Bắc Bộ
      return state.garmentId === 'ao-ba-ba' && state.headAccessoryId === 'non-quai-thao';
    },
    message: 'Áo bà ba là đặc trưng của văn hóa miệt vườn Nam Bộ, trong khi Nón Quai Thao là di sản độc bản của vùng quan họ Kinh Bắc. Sự kết hợp này làm lai tạp và bóp méo nhận diện vùng miền.',
    quote: '“Bắc nón ba tầm dải thao, Nam khăn rằn nón lá” — Mỗi vùng đất mang một linh hồn trang phục riêng biệt cần được tôn trọng.',
    suggestion: 'Hãy phối Áo Bà Ba cùng Khăn Rằn Nam Bộ hoặc Nón Lá Sen để giữ trọn vẻ mộc mạc phương Nam.',
    autoFix: {
      headAccessoryId: 'khan-ran'
    }
  },

  // ==================== CẢNH BÁO VÀNG (ADVISORY & HARMONY) ====================
  {
    id: 'rule-yellow-nhat-binh-sneaker',
    level: 'yellow',
    title: 'Lưu ý tính trang trọng của Áo Nhật Bình',
    check: (state) => {
      return state.garmentId === 'nhat-binh' && state.footAccessoryId === 'sneaker-trang';
    },
    message: 'Áo Nhật Bình là dòng lễ phục cung đình cao quý nhất thời Nguyễn. Việc phối cùng Sneaker thể thao hiện đại mang tính thử nghiệm Gen Z thú vị, nhưng sẽ giảm đi vẻ uy nghi, trang trọng nếu mặc trong các nghi lễ cưới hỏi chính thống.',
    quote: '“Áo Nhật Bình viền hoa ngũ sắc, thường dùng guốc cong hoặc hài thêu phụng hoàng.” — Khâm định Đại Nam hội điển sự lệ.',
    suggestion: 'Nếu tham gia lễ cưới truyền thống, bạn nên chọn Guốc mộc quai nhung hoặc Hài thêu cung đình để hoàn hảo nét quý phái.',
    autoFix: {
      footAccessoryId: 'guoc-moc'
    }
  },
  {
    id: 'rule-yellow-clashing-elements',
    level: 'yellow',
    title: 'Xung khắc Ngũ Hành trong phối màu áo và quần',
    check: (state, colorsMap) => {
      const outerColor = colorsMap[state.outerColorId];
      const bottomColor = colorsMap[state.bottomColorId];
      if (!outerColor || !bottomColor) return false;
      // Thủy khắc Hỏa (Lam Chàm + Đỏ Son) hoặc Hỏa khắc Kim
      return (outerColor.element === 'Thủy' && bottomColor.element === 'Hỏa') ||
             (outerColor.element === 'Hỏa' && bottomColor.element === 'Thủy');
    },
    message: 'Bộ màu bạn chọn có sự tương khắc giữa Thủy (nước) và Hỏa (lửa). Trong mỹ học phương Đông, sự xung khắc này tạo cảm giác căng thẳng thị giác nếu không có màu trung gian hòa giải.',
    quote: '“Thủy Hỏa tương xung, nan dĩ tương dung” — Bánh xe màu sắc cổ truyền ngũ hành.',
    suggestion: 'Thêm một phụ kiện thắt lưng màu Mộc (Xanh lục) để tạo thế tương sinh: Thủy sinh Mộc, Mộc sinh Hỏa.',
    autoFix: {
      beltColorId: 'luc-bao'
    }
  },

  // ==================== KHEN NGỢI XANH (PERFECT & CREATIVE REMIX) ====================
  {
    id: 'rule-green-genz-nguthan-sneaker',
    level: 'green',
    title: 'Gen Z Remix xuất sắc: Năng động mà tôn kính di sản!',
    check: (state) => {
      return state.garmentId === 'ngu-than' && state.footAccessoryId === 'sneaker-trang' && (state.eventId === 'tet-xuan' || state.eventId === 'su-kien-hoc-duong');
    },
    message: 'Tuyệt vời! Bạn đã kết hợp chuẩn mực nếp áo ngũ thân thời Nguyễn với đôi giày thể thao trắng năng động. Đây chính là biểu tượng của tinh thần “Việt phục Remix”: Giữ đúng hồn cốt cổ truyền nhưng tự tin sải bước cùng nhịp thở thời đại!',
    quote: '“Kế thừa truyền thống không phải là giữ gìn đống tro tàn, mà là thắp lên ngọn lửa bất diệt.” — Tinh thần Nghị quyết 68-NQ/TW.',
    suggestion: 'Bộ phối cực kỳ ăn ảnh khi check-in tại các di tích lịch sử như Hoàng thành Thăng Long, Văn Miếu hoặc phố đi bộ Hồ Gươm.',
    autoFix: null
  },
  {
    id: 'rule-green-traditional-wedding',
    level: 'green',
    title: 'Đại hỷ hoàng tộc: Chuẩn mực vàng cho Lễ cưới di sản!',
    check: (state) => {
      return state.garmentId === 'nhat-binh' && state.eventId === 'dam-cuoi' && (state.outerColorId === 'do-son' || state.outerColorId === 'hoang-tho');
    },
    message: 'Sự lựa chọn hoàn hảo! Áo Nhật Bình sắc Đỏ Son / Hoàng Thổ kết hợp trâm cài mạ vàng mang lại vẻ đẹp quý phái, vương giả, thể hiện lòng tự hào văn hóa sâu sắc của gia đình hai họ.',
    quote: '“Phượng hoàng hàm ngọc, tường vân cát khánh” — Vẻ đẹp nghi lễ cưới hỏi Đại Việt.',
    suggestion: 'Rất thích hợp để may đo kỷ niệm đời người hoặc thuê trọn gói dịch vụ ảnh cưới di sản.',
    autoFix: null
  },
  {
    id: 'rule-green-tu-than-kinh-bac',
    level: 'green',
    title: 'Duyên thầm Kinh Bắc: Nét đẹp thanh bình sông Đuống!',
    check: (state) => {
      return state.garmentId === 'tu-than' && state.headAccessoryId === 'non-quai-thao' && (state.eventId === 'hoi-lang' || state.eventId === 'tet-xuan');
    },
    message: 'Bộ trang phục tái hiện hoàn hảo hình ảnh người con gái Kinh Bắc: Áo tứ thân thướt tha, nón ba tầm dải thao buông lơi, yếm đào rực rỡ dưới nắng xuân.',
    quote: '“Gió đưa cành trúc la đà / Tiếng chuông Trấn Vũ canh gà Thọ Xương.” — Nét duyên cổ truyền nghìn năm.',
    suggestion: 'Đừng quên mang theo chiếc quạt lụa thêu tay để cử chỉ thêm phần e ấp, duyên dáng.',
    autoFix: null
  }
];

