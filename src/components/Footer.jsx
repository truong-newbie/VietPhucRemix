import React from 'react';
import { ShieldCheck, Heart, Award, ExternalLink, Compass } from 'lucide-react';

export function Footer({ onNavigateRoadmap }) {
  return (
    <footer className="bg-[#1D2440] text-gray-300 py-10 border-t-4 border-[#C9A227] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-700/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-wider">
                VIỆT PHỤC REMIX
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A227]/20 text-[#F9D423] border border-[#C9A227]/40">
                MVP 1.0 Live
              </span>
            </div>
            <p className="text-gray-400 mt-1 max-w-lg leading-relaxed">
              Dự án khởi nghiệp ứng dụng công nghệ để bảo tồn và lan tỏa di sản trang phục truyền thống Việt Nam đến thế hệ Gen Z và đại gia đình đa thế hệ.
            </p>
          </div>

          <div className="text-left md:text-right space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
              Cuộc thi Khởi nghiệp Sáng tạo HaUI 2026
            </span>
            <p className="text-white font-medium">Trường Đại học Công nghiệp Hà Nội (HaUI)</p>
            <p className="text-gray-400">Trường Công nghệ Thông tin & Truyền thông</p>

            {onNavigateRoadmap && (
              <button
                onClick={onNavigateRoadmap}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#8B1A1A] text-white font-bold text-xs transition border border-white/20 hover:border-[#8B1A1A]"
              >
                <Compass className="w-3.5 h-3.5 text-[#F9D423]" />
                <span>Xem Báo Cáo MVP &amp; Lộ Trình Phát Triển →</span>
              </button>
            )}
          </div>
        </div>

        {/* Team Leadership Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Đại diện dự án</span>
            <span className="font-bold text-white text-sm">Đỗ Đăng Trường</span>
            <p className="text-gray-400 text-[11px]">Trường Đại học Công nghiệp Hà Nội</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Liên hệ dự án</span>
            <span className="text-white font-medium">dangtruong3122005@gmail.com</span>
            <p className="text-gray-400 text-[11px]">HaUI Innovation Hub</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Kim chỉ nam tư tưởng</span>
            <span className="text-[#F9D423] italic text-[11px] font-medium">
              “Văn hóa còn thì Dân tộc còn”
            </span>
            <p className="text-gray-400 text-[10px]">Nghị quyết 33 & Nghị quyết 68-NQ/TW</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-2">
          <p>© 2026 Việt Phục Remix. Thiết kế phục vụ hồ sơ dự thi HaUI Startup Mindset 2026.</p>
          <div className="flex items-center gap-4">
            <span>Bảo tồn di sản</span>
            <span>•</span>
            <span>Giáo dục thẩm mỹ</span>
            <span>•</span>
            <span>Khởi nghiệp bền vững</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
