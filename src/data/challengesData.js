// 6 Thử thách Phối Chuẩn Thực Hành (Learning-by-Doing) gắn liền với Culture Guard & Harmony Score

export const CHALLENGES_DATA = [
  {
    id: 'ch-le-chua',
    title: 'Lễ Chùa Đầu Năm Trang Nghiêm',
    brief: 'Chọn trang phục kín đáo, thanh lịch đi lễ chùa đầu xuân: không mặc màu quá chói, không phạm lỗi tôn nghiêm (0 vi phạm đỏ) và đạt ít nhất 75 điểm hài hòa.',
    eventId: 'le-chua',
    requiredGarmentIds: ['ngu-than', 'ao-tac', 'giao-linh', 'ao-dai'],
    maxRedViolations: 0,
    minHarmony: 75,
    rewardGarmentId: 'ngu-than'
  },
  {
    id: 'ch-cuoi-hoang-toc',
    title: 'Đại Lễ Cưới Hoàng Tộc Huế',
    brief: 'Phối Áo Nhật Bình hoặc Áo Tấc sang trọng cho lễ cưới truyền thống với 0 vi phạm đỏ và đạt từ 80 điểm Ngũ Hành trở lên.',
    eventId: 'dam-cuoi',
    requiredGarmentIds: ['nhat-binh', 'ao-tac'],
    maxRedViolations: 0,
    minHarmony: 80,
    rewardGarmentId: 'nhat-binh'
  },
  {
    id: 'ch-quan-ho',
    title: 'Trẩy Hội Quan Họ Kinh Bắc',
    brief: 'Phối Áo Tứ Thân Bắc Bộ đúng tinh thần lễ hội xuân, không có cảnh báo đỏ và đạt ít nhất 78 điểm hài hòa.',
    eventId: 'le-hoi-xuan',
    requiredGarmentIds: ['tu-than'],
    maxRedViolations: 0,
    minHarmony: 78,
    rewardGarmentId: 'tu-than'
  },
  {
    id: 'ch-genz-tet',
    title: 'Phố Tết Gen Z Sáng Tạo An Toàn',
    brief: 'Phối đồ dạo phố Tết năng động, có thể phá cách phụ kiện nhưng tuyệt đối 0 vi phạm đỏ và đạt từ 80 điểm Harmony.',
    eventId: 'tet-xuan',
    requiredGarmentIds: [],
    maxRedViolations: 0,
    minHarmony: 80,
    rewardGarmentId: 'ao-dai'
  },
  {
    id: 'ch-mien-tay',
    title: 'Sông Nước Nam Bộ Thoáng Mát',
    brief: 'Phối Áo Bà Ba hài hòa sắc màu thiên nhiên cho bối cảnh dạo phố / lễ hội nhẹ nhàng, 0 vi phạm đỏ và từ 75 điểm Harmony.',
    eventId: 'dao-pho',
    requiredGarmentIds: ['ao-ba-ba'],
    maxRedViolations: 0,
    minHarmony: 75,
    rewardGarmentId: 'ao-ba-ba'
  },
  {
    id: 'ch-dai-viet-giao-linh',
    title: 'Hào Khí Đại Việt – Cổ Chéo Giao Lĩnh',
    brief: 'Trình diễn Áo Giao Lĩnh cổ chéo chuẩn nghi thức Đại Việt với 0 vi phạm đỏ và đạt ít nhất 80 điểm Ngũ Hành.',
    eventId: 'le-hoi-xuan',
    requiredGarmentIds: ['giao-linh'],
    maxRedViolations: 0,
    minHarmony: 80,
    rewardGarmentId: 'giao-linh'
  }
];
