import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class Stage3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full aspect-[3/4] max-h-[620px] rounded-2xl bg-surface-subtle border border-border-subtle p-6 flex flex-col items-center justify-center text-center gap-3">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
          <h4 className="font-bold text-sm text-[#1D2440]">
            Thiết bị chưa hỗ trợ hiển thị WebGL 3D
          </h4>
          <p className="text-xs text-gray-600 max-w-xs">
            Trình duyệt hoặc phần cứng hiện tại đã tắt tăng tốc đồ họa 3D. Bạn vẫn có thể phối đồ mượt mà trên sân khấu 2D.
          </p>
          {this.props.onFallback2D && (
            <button
              type="button"
              onClick={this.props.onFallback2D}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8B1A1A] text-white"
            >
              Quay về sân khấu 2D
            </button>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
