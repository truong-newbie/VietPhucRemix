import React from 'react';
import { Eye, RotateCcw, Sparkles, User, ZoomIn } from 'lucide-react';

export function AvatarStage({
  garment,
  outerColor,
  innerColor,
  bottomColor,
  beltColor,
  headAccessory,
  handAccessory,
  footAccessory,
  gender,
  onGenderChange
}) {
  const outerHex = outerColor ? outerColor.hex : '#8B1A1A';
  const innerHex = innerColor ? innerColor.hex : '#F5F5F0';
  const bottomHex = bottomColor ? bottomColor.hex : '#F5F5F0';
  const beltHex = beltColor ? beltColor.hex : '#C9A227';

  return (
    <div className="relative w-full aspect-[3/4] max-h-[620px] rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EBE4D5] border border-[#E0D5C1] shadow-xl overflow-hidden flex flex-col items-center justify-between p-4 select-none">
      {/* Background Heritage Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] text-[#8B1A1A]">
          <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 200,40 L 200,360 M 40,200 L 360,200" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top Floating Badges */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-[#D8C7B0] shadow-sm text-xs font-semibold text-[#664422]">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Layered SVG Engine</span>
        </div>

        {/* Gender Toggle */}
        <div className="flex bg-[#EAE2D3] p-0.5 rounded-full border border-[#D5C7B2] text-xs font-medium">
          <button
            onClick={() => onGenderChange('female')}
            className={`px-2.5 py-1 rounded-full transition-all ${
              gender === 'female'
                ? 'bg-[#8B1A1A] text-white shadow-sm'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            Nữ
          </button>
          <button
            onClick={() => onGenderChange('male')}
            className={`px-2.5 py-1 rounded-full transition-all ${
              gender === 'male'
                ? 'bg-[#8B1A1A] text-white shadow-sm'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            Nam
          </button>
        </div>
      </div>

      {/* Main Dynamic Vector SVG Avatar */}
      <div className="relative w-full flex-1 flex items-center justify-center z-10 py-2">
        <svg
          viewBox="0 0 320 480"
          className="w-full h-full max-h-[500px] drop-shadow-2xl transition-all duration-300"
        >
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDEDE2" />
              <stop offset="100%" stopColor="#F5DBC8" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D423" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
            <filter id="fabricShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 1. Body Base (Head, Neck, Hands) */}
          <g id="body-base">
            {/* Neck */}
            <path d="M150 110 L170 110 L172 135 L148 135 Z" fill="url(#skinGrad)" />
            {/* Head Face */}
            <ellipse cx="160" cy="85" rx="26" ry="32" fill="url(#skinGrad)" />
            {/* Hair base */}
            <path
              d="M134 82 C134 55, 186 55, 186 82 C186 92, 178 72, 160 72 C142 72, 134 92, 134 82 Z"
              fill="#221F1F"
            />
            {/* Face Features (Subtle & Elegant) */}
            <ellipse cx="151" cy="83" rx="2" ry="1.2" fill="#3D2D2D" />
            <ellipse cx="169" cy="83" rx="2" ry="1.2" fill="#3D2D2D" />
            <path d="M159 87 L160 92 L161 92" stroke="#D2A688" strokeWidth="1" fill="none" />
            <path d="M156 98 Q160 101 164 98" stroke="#B84A39" strokeWidth="1.6" fill="none" />
          </g>

          {/* 2. Lower Body: Trousers / Skirt (Quần lụa / Váy lĩnh) */}
          <g id="bottom-garment" filter="url(#fabricShadow)">
            {garment.id === 'tu-than' ? (
              // Váy đầm lĩnh đen của áo tứ thân
              <path
                d="M135 240 Q160 250 185 240 L205 410 Q160 415 115 410 Z"
                fill={bottomHex}
              />
            ) : (
              // Quần suông dài lụa ống rộng
              <g>
                {/* Ống quần trái */}
                <path
                  d="M136 240 L120 410 L152 410 L158 280 Z"
                  fill={bottomHex}
                />
                {/* Ống quần phải */}
                <path
                  d="M184 240 L200 410 L168 410 L162 280 Z"
                  fill={bottomHex}
                />
                {/* Nếp gấp vải quần */}
                <path d="M136 270 L132 405" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" />
                <path d="M184 270 L188 405" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" />
              </g>
            )}
          </g>

          {/* 3. Footwear */}
          <g id="footwear">
            {footAccessory && footAccessory.id === 'sneaker-trang' ? (
              // Sneaker Trắng Hiện Đại Gen Z
              <g>
                <rect x="110" y="408" width="44" height="16" rx="6" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
                <path d="M115 416 L145 416" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 2" />
                <rect x="166" y="408" width="44" height="16" rx="6" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
                <path d="M171 416 L201 416" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 2" />
              </g>
            ) : footAccessory && footAccessory.id === 'guoc-moc' ? (
              // Guốc Mộc Quai Nhung Đỏ
              <g>
                <path d="M118 412 L150 412 L146 422 L122 422 Z" fill="#9C6644" />
                <path d="M125 412 Q134 406 143 412" stroke="#8B1A1A" strokeWidth="3" fill="none" />
                <path d="M170 412 L202 412 L198 422 L174 422 Z" fill="#9C6644" />
                <path d="M177 412 Q186 406 195 412" stroke="#8B1A1A" strokeWidth="3" fill="none" />
              </g>
            ) : (
              // Giày búp bê / giày mềm
              <g>
                <ellipse cx="134" cy="414" rx="16" ry="6" fill="#212124" />
                <ellipse cx="186" cy="414" rx="16" ry="6" fill="#212124" />
              </g>
            )}
          </g>

          {/* 4. Inner Collar / Yếm (Lớp trong) */}
          <g id="inner-layer">
            {garment.id === 'tu-than' ? (
              // Yếm đào hình quả trám
              <polygon points="160,115 185,155 160,195 135,155" fill={innerHex} />
            ) : (
              // Cổ áo lót trong màu trắng ngà
              <path d="M148 118 L160 132 L172 118" stroke={innerHex} strokeWidth="5" fill="none" />
            )}
          </g>

          {/* 5. Main Garment Layer (Theo từng dòng trang phục cụ thể) */}
          <g id="main-garment" filter="url(#fabricShadow)">
            {garment.id === 'ngu-than' ? (
              // ====== ÁO NGŨ THÂN TAY CHẼN TRIỀU NGUYỄN ======
              <g>
                {/* Thân áo chính xòe nhẹ, tà xẻ bên hông */}
                <path
                  d="M142 120 L90 190 L110 200 L135 165 L130 330 Q160 335 190 330 L185 165 L210 200 L230 190 L178 120 Z"
                  fill={outerHex}
                />
                {/* Cổ áo lập lĩnh đứng */}
                <path d="M146 115 L174 115 L174 126 L146 126 Z" fill={outerHex} stroke="#540C0C" strokeWidth="0.8" />
                {/* Đường cài khuy sang nách phải (Khuy ngũ thân) */}
                <path d="M160 126 Q178 135 182 155" stroke="rgba(0,0,0,0.25)" strokeWidth="1.8" fill="none" />
                {/* 5 Hạt Khuy Ngũ Thường màu vàng kim */}
                <circle cx="160" cy="126" r="2.2" fill="url(#goldGradient)" />
                <circle cx="168" cy="132" r="2.2" fill="url(#goldGradient)" />
                <circle cx="176" cy="140" r="2.2" fill="url(#goldGradient)" />
                <circle cx="181" cy="150" r="2.2" fill="url(#goldGradient)" />
                <circle cx="183" cy="165" r="2.2" fill="url(#goldGradient)" />
                {/* Nếp áo chuyển động nhẹ */}
                <path d="M148 180 L145 325" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none" />
              </g>
            ) : garment.id === 'tu-than' ? (
              // ====== ÁO TỨ THÂN BẮC BỘ ======
              <g>
                {/* Tà áo tứ thân mở trước, hai vạt trước buông lơi */}
                <path
                  d="M142 120 L80 185 L98 198 L130 160 L122 360 L142 365 L146 220 L154 220 L158 365 L178 360 L170 160 L202 198 L220 185 L158 120 Z"
                  fill={outerHex}
                />
                {/* Khăn bao thắt lưng ngũ sắc */}
                <rect x="135" y="210" width="50" height="12" fill={beltHex} rx="2" />
                {/* Dải dây lụa thắt buông rủ xuống trước bụng */}
                <path d="M155 222 L150 290 L160 290 L165 222 Z" fill={beltHex} />
              </g>
            ) : garment.id === 'nhat-binh' ? (
              // ====== ÁO NHẬT BÌNH HOÀNG GIA TRIỀU NGUYỄN ======
              <g>
                {/* Thân áo rộng quý phái */}
                <path
                  d="M140 120 L75 195 L95 210 L130 170 L125 350 Q160 355 195 350 L190 170 L225 210 L245 195 L180 120 Z"
                  fill={outerHex}
                />
                {/* Cổ chữ nhật Nhật Bình viền to bản trước ngực */}
                <rect x="144" y="118" width="32" height="60" fill="none" stroke="url(#goldGradient)" strokeWidth="7" />
                <rect x="147" y="121" width="26" height="54" fill="none" stroke="#8B1A1A" strokeWidth="1.5" />
                {/* Dải ngũ sắc viền ở cổ tay áo trái */}
                <g transform="translate(75, 195) rotate(-35)">
                  <rect x="0" y="0" width="4" height="22" fill="#8B1A1A" />
                  <rect x="4" y="0" width="4" height="22" fill="#C9A227" />
                  <rect x="8" y="0" width="4" height="22" fill="#1F6F5C" />
                  <rect x="12" y="0" width="4" height="22" fill="#1D2440" />
                  <rect x="16" y="0" width="4" height="22" fill="#FAF7F2" />
                </g>
                {/* Dải ngũ sắc viền ở cổ tay áo phải */}
                <g transform="translate(225, 210) rotate(35)">
                  <rect x="0" y="0" width="4" height="22" fill="#8B1A1A" />
                  <rect x="4" y="0" width="4" height="22" fill="#C9A227" />
                  <rect x="8" y="0" width="4" height="22" fill="#1F6F5C" />
                  <rect x="12" y="0" width="4" height="22" fill="#1D2440" />
                  <rect x="16" y="0" width="4" height="22" fill="#FAF7F2" />
                </g>
                {/* Hoa văn gấu áo sóng nước thủy ba */}
                <path d="M126 345 Q143 338 160 345 Q177 338 194 345" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" />
              </g>
            ) : garment.id === 'ao-ba-ba' ? (
              // ====== ÁO BÀ BA NAM BỘ ======
              <g>
                {/* Thân áo ngắn xẻ tà hai bên hông */}
                <path
                  d="M144 122 L96 185 L112 195 L136 160 L132 255 Q160 258 188 255 L184 160 L208 195 L224 185 L176 122 Z"
                  fill={outerHex}
                />
                {/* Cổ tròn mở thanh thoát */}
                <path d="M148 122 Q160 134 172 122" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" fill="none" />
                {/* Hàng khuy bấm giữa ngực */}
                <path d="M160 134 L160 254" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeDasharray="6 8" />
                {/* Hai túi nhỏ trước vạt áo */}
                <rect x="138" y="225" width="16" height="18" rx="2" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                <rect x="166" y="225" width="16" height="18" rx="2" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              </g>
            ) : (
              // ====== ÁO DÀI TRUYỀN THỐNG / CÁCH TÂN ======
              <g>
                {/* Thân áo dài ôm sát, tà buông dài qua gối */}
                <path
                  d="M144 120 L90 190 L108 200 L136 160 L128 375 Q160 382 192 375 L184 160 L212 200 L230 190 L176 120 Z"
                  fill={outerHex}
                />
                {/* Cổ đứng cổ điển */}
                <path d="M148 116 L172 116 L172 124 L148 124 Z" fill={outerHex} stroke="#540C0C" strokeWidth="0.8" />
                {/* Tà áo xẻ cao duyên dáng từ eo */}
                <path d="M136 210 L130 374" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" fill="none" />
                <path d="M184 210 L190 374" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" fill="none" />
              </g>
            )}
          </g>

          {/* 6. Handheld Accessories */}
          <g id="hand-accessory">
            {handAccessory && handAccessory.id === 'quat-lua' ? (
              // Quạt Lụa Thêu Cổ Điển
              <g transform="translate(200, 200) rotate(-15)">
                <path d="M0 0 L-22 -35 A40 40 0 0 1 22 -35 Z" fill="#FDF6ED" stroke="#C9A227" strokeWidth="1.5" />
                <circle cx="0" cy="-22" r="5" fill="#8B1A1A" opacity="0.6" />
                <line x1="0" y1="0" x2="0" y2="12" stroke="#8C5E3B" strokeWidth="2.5" />
                <path d="M0 12 L0 25" stroke="#8B1A1A" strokeWidth="1.5" />
              </g>
            ) : handAccessory && handAccessory.id === 'tui-tote' ? (
              // Túi Tote Canvas Trống Đồng Gen Z
              <g transform="translate(85, 205)">
                <rect x="0" y="15" width="34" height="42" rx="3" fill="#EFE8DC" stroke="#8C7860" strokeWidth="1.2" />
                <path d="M9 15 C9 -2, 25 -2, 25 15" stroke="#8C7860" strokeWidth="2" fill="none" />
                <circle cx="17" cy="35" r="9" fill="none" stroke="#C9A227" strokeWidth="1.2" strokeDasharray="2 1.5" />
                <circle cx="17" cy="35" r="3" fill="#8B1A1A" />
              </g>
            ) : handAccessory && handAccessory.id === 'tui-coi' ? (
              // Túi Cói Dân Gian
              <g transform="translate(86, 210)">
                <ellipse cx="16" cy="28" rx="18" ry="14" fill="#C9A87C" stroke="#8C6842" strokeWidth="1" />
                <path d="M6 16 C6 4, 26 4, 26 16" stroke="#8C6842" strokeWidth="2" fill="none" />
              </g>
            ) : null}
          </g>

          {/* 7. Headwear Accessories */}
          <g id="headwear">
            {headAccessory && headAccessory.id === 'khan-van' ? (
              // Khăn Vấn Truyền Thống Quấn Nhiều Vòng
              <g>
                <ellipse cx="160" cy="72" rx="27" ry="12" fill={outerHex} stroke="#3D0B0B" strokeWidth="1.5" />
                <ellipse cx="160" cy="75" rx="28" ry="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <ellipse cx="160" cy="70" rx="25" ry="8" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              </g>
            ) : headAccessory && headAccessory.id === 'non-quai-thao' ? (
              // Nón Quai Thao (Ba Tầm) Rộng Vành
              <g>
                <ellipse cx="160" cy="62" rx="60" ry="14" fill="#E8D5B5" stroke="#A88B5B" strokeWidth="1.5" />
                <ellipse cx="160" cy="62" rx="55" ry="11" fill="none" stroke="#CBB48E" strokeWidth="1" />
                {/* Dải Thao Lụa buông dài */}
                <path d="M125 66 Q128 130 134 190" stroke="#8B1A1A" strokeWidth="2.5" fill="none" />
                <path d="M195 66 Q192 130 186 190" stroke="#8B1A1A" strokeWidth="2.5" fill="none" />
              </g>
            ) : headAccessory && headAccessory.id === 'non-la-sen' ? (
              // Nón Lá Sen Xứ Huế
              <g>
                <polygon points="160,35 105,75 215,75" fill="#EFE5CD" stroke="#B8A783" strokeWidth="1.2" />
                <path d="M105 75 Q160 84 215 75" fill="#DFD2B5" stroke="#B8A783" strokeWidth="1" />
                <path d="M160 35 L125 76" stroke="#9E8D68" strokeWidth="0.7" />
                <path d="M160 35 L195 76" stroke="#9E8D68" strokeWidth="0.7" />
              </g>
            ) : headAccessory && headAccessory.id === 'khan-ran' ? (
              // Khăn Rằn Nam Bộ
              <g>
                <path d="M136 76 Q160 62 184 76 L180 92 Q160 80 140 92 Z" fill="#FFFFFF" stroke="#333" strokeWidth="1" />
                <path d="M136 76 L184 76" stroke="#1D2440" strokeWidth="2" strokeDasharray="4 4" />
                {/* Vạt khăn vắt qua vai */}
                <path d="M140 88 L135 160 L145 160 L146 90 Z" fill="#FFFFFF" stroke="#333" strokeWidth="1" />
                <path d="M135 110 L145 110 M135 130 L145 130" stroke="#1D2440" strokeWidth="2" />
              </g>
            ) : headAccessory && headAccessory.id === 'tram-cai-sen' ? (
              // Trâm Cài Hoa Sen Mạ Vàng
              <g transform="translate(180, 68) rotate(25)">
                <line x1="0" y1="0" x2="28" y2="0" stroke="url(#goldGradient)" strokeWidth="2" />
                <circle cx="28" cy="0" r="4.5" fill="#8B1A1A" />
                <circle cx="32" cy="-2" r="2.5" fill="url(#goldGradient)" />
              </g>
            ) : null}
          </g>
        </svg>
      </div>

      {/* Bottom Summary Bar */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-[#E0D5C1] shadow-sm flex items-center justify-between z-10 text-xs">
        <div>
          <span className="text-gray-500 block text-[10px] uppercase font-semibold">Trang phục đang chọn</span>
          <span className="font-bold text-[#8B1A1A] text-sm">{garment.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: outerHex }} title="Màu áo chính" />
            <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: bottomHex }} title="Màu quần/váy" />
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#FAF3DD] text-[#8C5E3B] font-semibold text-[11px]">
            {garment.era.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

