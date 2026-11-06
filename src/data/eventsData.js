// 10 Bối cảnh & Sự kiện Văn hóa đặc trưng
export const EVENTS_DATA = [
  {
    id: 'tet-xuan',
    name: 'Dạo Phố Tết & Du Xuân',
    category: 'Lễ hội truyền thống',
    targetAudience: 'all',
    icon: 'Sparkles',
    weather: {
      temp: '21°C',
      desc: 'Tiết trời se lạnh, nắng ấm mùa xuân',
      advice: 'Nên chọn áo khoác gấm ngũ thân hoặc áo dài lụa kết hợp khăn vấn ấm áp.'
    },
    recommendedGarments: ['ngu-than', 'ao-dai', 'tu-than'],
    recommendedColors: ['do-son', 'hoang-tho', 'hong-dao', 'luc-bao'],
    forbiddenColors: ['den-tuyen'],
    etiquette: 'Ưu tiên gam màu ấm áp, hỷ khí (Đỏ, Vàng, Hồng đào). Tránh mặc tuyền đen trong ngày mùng một Tết.',
    badge: 'Phổ biến nhất'
  },
  {
    id: 'le-chua',
    name: 'Đi Lễ Chùa & Nơi Tôn Nghiêm',
    category: 'Tâm linh & Cội nguồn',
    targetAudience: 'all',
    icon: 'HeartHandshake',
    weather: {
      temp: '19°C',
      desc: 'Không khí trang nghiêm, thanh tịnh',
      advice: 'Bắt buộc trang phục kín đáo, tà áo dài qua gối, quần dài, tránh cổ xẻ sâu.'
    },
    recommendedGarments: ['ao-dai', 'ngu-than'],
    recommendedColors: ['lam-cham', 'nau-non', 'luc-bao', 'trang-su'],
    forbiddenColors: ['do-son'], // Quá rực rỡ hoặc hở hang không phù hợp
    etiquette: 'Tôn trọng chốn cửa Thiền: Tuyệt đối không mặc váy ngắn, tà cộc, áo cổ khoét sâu, màu sắc quá chói lọi.',
    badge: 'Nghi thức cao'
  },
  {
    id: 'ky-yeu',
    name: 'Chụp Kỷ Yếu & Tốt Nghiệp',
    category: 'Học sinh & Sinh viên',
    targetAudience: 'genz',
    icon: 'GraduationCap',
    weather: {
      temp: '26°C',
      desc: 'Nắng đẹp rực rỡ, thích hợp chụp ảnh nhóm',
      advice: 'Áo dài trắng hoặc áo tấc ngũ thân kết hợp phụ kiện sneaker trẻ trung.'
    },
    recommendedGarments: ['ao-dai', 'ngu-than'],
    recommendedColors: ['trang-su', 'luc-bao', 'lam-cham', 'hong-dao'],
    forbiddenColors: [],
    etiquette: 'Đồng bộ phom dáng trong tập thể lớp; tôn trọng huy hiệu trường và tính thanh lịch học đường.',
    badge: 'Gen Z Yêu thích'
  },
  {
    id: 'dam-cuoi',
    name: 'Đám Cưới Truyền Thống & Ăn Hỏi',
    category: 'Hỷ sự gia đình',
    targetAudience: 'family',
    icon: 'Crown',
    weather: {
      temp: '24°C',
      desc: 'Không khí hân hoan, trang trọng cả hai họ',
      advice: 'Áo Nhật Bình hoặc Áo ngũ thân thêu chỉ kim tuyến, khăn vấn hoàng tộc lộng lẫy.'
    },
    recommendedGarments: ['nhat-binh', 'ngu-than', 'ao-dai'],
    recommendedColors: ['do-son', 'hoang-tho', 'hong-dao'],
    forbiddenColors: ['den-tuyen', 'nau-non'],
    etiquette: 'Hỷ sự thiêng liêng: Bắt buộc chọn gam màu tươi sáng, trang phục chỉnh chu thể hiện lòng kính hiếu hai họ.',
    badge: 'Cao cấp & Gia đình'
  },
  {
    id: 'hoi-lang',
    name: 'Hội Làng Quan Họ Kinh Bắc',
    category: 'Văn hóa dân gian',
    targetAudience: 'all',
    icon: 'Music',
    weather: {
      temp: '23°C',
      desc: 'Mùa xuân trẩy hội, gió thổi bay tà áo',
      advice: 'Áo tứ thân nhiều lớp màu, nón quai thao và quạt lụa cầm tay duyên dáng.'
    },
    recommendedGarments: ['tu-than'],
    recommendedColors: ['nau-non', 'do-son', 'hoang-tho', 'luc-bao'],
    forbiddenColors: [],
    etiquette: 'Gìn giữ nếp giao duyên: Yếm kín cổ, thắt lưng ngũ sắc buông thả tự nhiên trước bụng.',
    badge: 'Đặc sắc Bắc Bộ'
  },
  {
    id: 'festival-hue',
    name: 'Festival Huế & Du Lịch Di Sản',
    category: 'Lễ hội văn hóa quốc gia',
    targetAudience: 'all',
    icon: 'Landmark',
    weather: {
      temp: '27°C',
      desc: 'Cố đô hoài niệm, kiến trúc cung điện rực rỡ',
      advice: 'Áo ngũ thân tay chẽn hoặc áo dài tím Huế, nón lá sen thêu thơ.'
    },
    recommendedGarments: ['ngu-than', 'ao-dai', 'nhat-binh'],
    recommendedColors: ['tim-hue', 'luc-bao', 'hoang-tho', 'lam-cham'],
    forbiddenColors: [],
    etiquette: 'Hòa mình vào không gian di sản Đại Nội: Tôn trọng các di tích lịch sử và quy định điểm tham quan.',
    badge: 'Không gian Cố đô'
  },
  {
    id: 'song-nuoc-nam-bo',
    name: 'Du Lịch Miền Tây Sông Nước',
    category: 'Khám phá thiên nhiên',
    targetAudience: 'genz',
    icon: 'Compass',
    weather: {
      temp: '31°C',
      desc: 'Nắng phương Nam, gió kênh rạch mát mẻ',
      advice: 'Áo bà ba vải lụa hoặc đũi mát mẻ, kết hợp khăn rằn và nón lá duyên dáng.'
    },
    recommendedGarments: ['ao-ba-ba'],
    recommendedColors: ['xanh-co-vit', 'nau-non', 'trang-su', 'hong-dao'],
    forbiddenColors: [],
    etiquette: 'Thoải mái vận động xuồng ghe nhưng vẫn giữ nét duyên dáng, kín đáo của con gái Nam Bộ.',
    badge: 'Dã ngoại khám phá'
  },
  {
    id: 'su-kien-hoc-duong',
    name: 'Ngày Hội Văn Hóa Sinh Viên HaUI',
    category: 'Học đường & Sáng tạo',
    targetAudience: 'genz',
    icon: 'Layers',
    weather: {
      temp: '25°C',
      desc: 'Năng động, hào hứng, sân trường rợp cờ hoa',
      advice: 'Việt phục Remix sáng tạo: Áo ngũ thân kết hợp giày thể thao trắng hoặc phụ kiện hiện đại.'
    },
    recommendedGarments: ['ngu-than', 'ao-dai', 'tu-than'],
    recommendedColors: ['do-son', 'luc-bao', 'lam-cham', 'trang-su'],
    forbiddenColors: [],
    etiquette: 'Khuyến khích sáng tạo cá nhân (Remix) nhưng không được làm biến dạng cấu trúc nếp áo truyền thống.',
    badge: 'HaUI Mindset'
  },
  {
    id: 'cong-so-sang-tao',
    name: 'Công Sở & Giao Lưu Quốc Tế',
    category: 'Thời trang thường nhật',
    targetAudience: 'all',
    icon: 'Briefcase',
    weather: {
      temp: '24°C',
      desc: 'Môi trường làm việc văn minh, chuyên nghiệp',
      advice: 'Áo dài cách tân cổ trụ thấp hoặc áo ngũ thân tối giản phối quần âu thanh lịch.'
    },
    recommendedGarments: ['ao-dai', 'ngu-than'],
    recommendedColors: ['lam-cham', 'luc-bao', 'trang-su', 'den-tuyen'],
    forbiddenColors: [],
    etiquette: 'Gọn gàng, lịch sự, tôn dáng nhưng không gây cản trở công việc và giao tiếp thường nhật.',
    badge: 'Ứng dụng cao'
  },
  {
    id: 'gia-dinh-sum-hop',
    name: 'Mừng Thọ & Đại Lễ Gia Đình',
    category: 'Gia đình đa thế hệ',
    targetAudience: 'family',
    icon: 'Users',
    weather: {
      temp: '22°C',
      desc: 'Ấm cúng, sum vầy con cháu nhiều thế hệ',
      advice: 'Đại gia đình đồng bộ Việt phục ngũ sắc: Ông bà áo gấm chữ Thọ, con cháu áo ngũ thân/áo dài.'
    },
    recommendedGarments: ['ngu-than', 'ao-dai', 'nhat-binh'],
    recommendedColors: ['hoang-tho', 'do-son', 'luc-bao', 'lam-cham'],
    forbiddenColors: ['den-tuyen'],
    etiquette: 'Gia phong kính trên nhường dưới: Màu sắc rực rỡ chúc thọ người lớn tuổi, trang phục nền nã mẫu mực.',
    badge: 'Đại gia đình'
  }
];

