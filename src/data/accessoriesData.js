// Danh mục phụ kiện truyền thống & phối hiện đại (Remix)
// modern: true dùng cho bộ phân loại 3 cấp độ sáng tạo (Truyền thống vs Cách tân)
export const ACCESSORIES_DATA = {
  head: [
    {
      id: 'khan-van',
      name: 'Khăn Vấn Truyền Thống',
      type: 'Truyền thống',
      regions: ['toan-quoc'],
      modern: false,
      garmentCompatibility: ['ngu-than', 'ao-tac', 'ao-dai', 'nhat-binh'],
      meaning: 'Vành khăn quấn quanh đầu thể hiện sự gọn gàng, trang nghiêm và phong thái đài các của người Việt.',
      icon: 'Crown'
    },
    {
      id: 'non-quai-thao',
      name: 'Nón Quai Thao (Nón Ba Tầm)',
      type: 'Dân gian Bắc Bộ',
      regions: ['bac'],
      modern: false,
      garmentCompatibility: ['tu-than'],
      meaning: 'Chiếc nón tròn phẳng rộng vành với dải thao lụa mềm mại, che chở duyên thầm các liền chị Quan họ.',
      icon: 'Circle'
    },
    {
      id: 'non-la-sen',
      name: 'Nón Lá Sen Xứ Huế',
      type: 'Thơ mộng di sản',
      regions: ['trung', 'toan-quoc'],
      modern: false,
      garmentCompatibility: ['ao-dai', 'ngu-than', 'ao-tac', 'ao-ba-ba'],
      meaning: 'Hình ảnh chiếc nón bài thơ làm từ lá sen tự nhiên, đậm đà chất thơ và tinh thần thanh khiết.',
      icon: 'Sun'
    },
    {
      id: 'khan-ran',
      name: 'Khăn Rằn Nam Bộ',
      type: 'Dân dã phương Nam',
      regions: ['nam'],
      modern: false,
      garmentCompatibility: ['ao-ba-ba'],
      meaning: 'Khăn dệt hai màu trắng đen hoặc đỏ trắng ca-rô, vật bất ly thân của người dân khai hoang đất phương Nam.',
      icon: 'Square'
    },
    {
      id: 'tram-cai-sen',
      name: 'Trâm Cài Hoa Sen Mạ Vàng',
      type: 'Quý phái cung đình',
      regions: ['trung', 'toan-quoc'],
      modern: false,
      garmentCompatibility: ['nhat-binh', 'ngu-than', 'ao-tac', 'ao-dai', 'giao-linh'],
      meaning: 'Trâm bạc/đồng mạ vàng chạm khắc hoa sen hoặc phượng hoàng, tôn lên vẻ đài các của tiểu thư quyền quý.',
      icon: 'Sparkles'
    },
    {
      id: 'khong-mu',
      name: 'Tóc Thả Tự Nhiên / Búi Trễ',
      type: 'Tối giản hiện đại',
      regions: ['toan-quoc'],
      modern: true,
      garmentCompatibility: ['ao-dai', 'ngu-than', 'ao-tac', 'giao-linh', 'ao-ba-ba', 'tu-than'],
      meaning: 'Phong cách tối giản, tôn lên nét mặt thanh tú và sự tự do của thế hệ trẻ.',
      icon: 'User'
    }
  ],
  hand: [
    {
      id: 'quat-lua',
      name: 'Quạt Lụa Thêu Tay Cổ Điển',
      type: 'Truyền thống',
      regions: ['toan-quoc'],
      modern: false,
      garmentCompatibility: ['ngu-than', 'ao-tac', 'nhat-binh', 'tu-than', 'giao-linh', 'ao-dai'],
      meaning: 'Cầm trên tay chiếc quạt lụa thêu cành mai, chim phượng tạo nên cử chỉ thanh tao, đoan trang.',
      icon: 'Feather'
    },
    {
      id: 'tui-tote',
      name: 'Túi Tote Canvas Họa Tiết Di Sản',
      type: 'Gen Z Remix',
      regions: ['toan-quoc'],
      modern: true,
      garmentCompatibility: ['ngu-than', 'ao-dai', 'ao-ba-ba'],
      meaning: 'Túi vải mộc in họa tiết hoa văn chim Lạc trống đồng Đông Sơn, tiện lợi và năng động cho bạn trẻ.',
      icon: 'ShoppingBag'
    },
    {
      id: 'tui-coi',
      name: 'Túi Cói Đan Thủ Công Dân Gian',
      type: 'Mộc mạc sinh thái',
      regions: ['bac', 'nam', 'toan-quoc'],
      modern: false,
      garmentCompatibility: ['tu-than', 'ao-ba-ba', 'ao-dai'],
      meaning: 'Làm từ sợi cói tự nhiên của làng nghề Nga Sơn, thân thiện môi trường và hài hòa cùng áo tứ thân, bà ba.',
      icon: 'Briefcase'
    },
    {
      id: 'chuoi-ngoc',
      name: 'Chuỗi Vòng Ngọc Trai Phú Quốc',
      type: 'Quý phái thượng lưu',
      regions: ['toan-quoc'],
      modern: false,
      garmentCompatibility: ['nhat-binh', 'ao-tac', 'ao-dai', 'ngu-than'],
      meaning: 'Đeo cổ trang nhã, thường đi cùng áo dài nhung gấm của mẹ hoặc quý cô trong các dịp khánh tiết.',
      icon: 'CircleDot'
    },
    {
      id: 'khong-cam-tay',
      name: 'Không Mang Phụ Kiện Cầm Tay',
      type: 'Tự do',
      regions: ['toan-quoc'],
      modern: false,
      garmentCompatibility: ['ngu-than', 'ao-tac', 'giao-linh', 'tu-than', 'nhat-binh', 'ao-dai', 'ao-ba-ba'],
      meaning: 'Giữ hai tay tự nhiên, phong thái thoải mái.',
      icon: 'Hand'
    }
  ],
  foot: [
    {
      id: 'sneaker-trang',
      name: 'Sneaker Thể Thao Trắng Tối Giản',
      type: 'Gen Z Remix Đặc Trưng',
      regions: ['toan-quoc'],
      modern: true,
      garmentCompatibility: ['ngu-than', 'ao-dai'],
      meaning: 'Cú bắt tay giữa di sản cổ truyền và nhịp sống trẻ: Giúp di chuyển linh hoạt, tự tin sải bước khắp phố phường.',
      icon: 'Footprints'
    },
    {
      id: 'guoc-moc',
      name: 'Guốc Mộc Quai Nhung Cổ Truyền',
      type: 'Di sản thuần khiết',
      regions: ['toan-quoc'],
      modern: false,
      garmentCompatibility: ['ngu-than', 'ao-tac', 'giao-linh', 'tu-than', 'nhat-binh', 'ao-dai', 'ao-ba-ba'],
      meaning: 'Âm thanh lách cách của guốc gỗ trên nền gạch ngói gợi nhắc ký ức xưa của phố cổ và làng quê Việt.',
      icon: 'Disc'
    },
    {
      id: 'giay-bup-be',
      name: 'Giày Búp Bê Thêu Hoa Nhẹ Nhàng',
      type: 'Thanh lịch nữ tính',
      regions: ['toan-quoc'],
      modern: true,
      garmentCompatibility: ['ao-dai', 'ngu-than', 'ao-ba-ba'],
      meaning: 'Mũi giày tròn thêu hoa văn chỉ tơ, êm ái cho đôi chân và tôn nét mềm mại của tà áo dài.',
      icon: 'Sparkle'
    },
    {
      id: 'dep-coi',
      name: 'Dép Cói Quai Đan Nam Bộ',
      type: 'Dân dã phóng khoáng',
      regions: ['nam', 'toan-quoc'],
      modern: false,
      garmentCompatibility: ['ao-ba-ba', 'tu-than', 'giao-linh'],
      meaning: 'Thoáng mát, mộc mạc, rất hợp với áo bà ba và không gian sông nước.',
      icon: 'Grid'
    }
  ]
};
