import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, Download, ArrowLeft, CheckCircle2, Search } from 'lucide-react';
import { CULTURE_RULES } from '../data/cultureRules';
import { getSupabaseClient } from '../services/supabase';
import { getAdminEmails } from '../config/env';
import { loadJson, saveJson } from '../utils/storage';

const LOCAL_REVIEWS_KEY = 'vpr_rule_reviews';

export function AdvisorAdminPage({ user, onBack }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [onlyNeedsReview, setOnlyNeedsReview] = useState(true);
  const [reviewsMap, setReviewsMap] = useState(() => loadJson(LOCAL_REVIEWS_KEY, {}));
  const [editingId, setEditingId] = useState(null);
  const [draftSource, setDraftSource] = useState('');
  const [draftNotes, setDraftNotes] = useState('');

  const adminEmails = getAdminEmails();
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const isAuthorized =
    isLocalhost ||
    (user?.email && (adminEmails.length === 0 || adminEmails.includes(user.email.toLowerCase())));

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) return;
    client
      .from('rule_reviews')
      .select('*')
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = { ...loadJson(LOCAL_REVIEWS_KEY, {}) };
          for (const r of data) {
            merged[r.rule_id] = r;
          }
          setReviewsMap(merged);
          saveJson(LOCAL_REVIEWS_KEY, merged);
        }
      });
  }, []);

  const filteredRules = useMemo(() => {
    return CULTURE_RULES.filter((r) => {
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
      const reviewed = reviewsMap[r.id];
      const currentSource = reviewed?.verified_source || r.source;
      if (onlyNeedsReview && currentSource !== 'CẦN THẨM ĐỊNH') return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.id.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categoryFilter, onlyNeedsReview, search, reviewsMap]);

  const handleSaveReview = async (ruleId) => {
    if (!draftSource.trim()) return;
    const entry = {
      rule_id: ruleId,
      status: 'verified',
      verified_source: draftSource.trim(),
      reviewer_email: user?.email || 'co-van-local@haui.edu.vn',
      notes: draftNotes.trim(),
      reviewed_at: new Date().toISOString()
    };

    const nextMap = { ...reviewsMap, [ruleId]: entry };
    setReviewsMap(nextMap);
    saveJson(LOCAL_REVIEWS_KEY, nextMap);
    setEditingId(null);

    const client = getSupabaseClient();
    if (client && user) {
      await client.from('rule_reviews').upsert(entry, { onConflict: 'rule_id' });
    }
  };

  const handleExportJson = () => {
    const updated = CULTURE_RULES.map((r) => {
      const rev = reviewsMap[r.id];
      return rev ? { ...r, source: rev.verified_source, advisorNotes: rev.notes } : r;
    });
    const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verified-rules.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] p-8 flex flex-col items-center justify-center text-center gap-4">
        <ShieldCheck className="w-10 h-10 text-[#8B1A1A]" />
        <h2 className="font-bold text-lg text-[#1D2440]">Khu vực dành riêng cho Hội đồng Cố vấn Văn hóa</h2>
        <p className="text-xs text-gray-600 max-w-md">
          Vui lòng đăng nhập bằng email thuộc danh sách cố vấn (`VITE_ADMIN_EMAILS`) để thẩm định bộ luật.
        </p>
        <button onClick={onBack} className="px-4 py-2 rounded-xl bg-[#8B1A1A] text-white text-xs font-bold">
          Quay về Phòng Phối Đồ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#DECDB8] shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-xl bg-[#FAF7F2] border border-[#DECDB8] text-[#1D2440]">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#8B1A1A] block">
                Lớp 2 – Thẩm định Chuyên gia (?admin=1)
              </span>
              <h1 className="font-bold text-lg text-[#1D2440]">
                Bảng Duyệt Kho Luật Culture Guard ({CULTURE_RULES.length} luật)
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1F6F5C] text-white shadow"
          >
            <Download className="w-4 h-4" />
            <span>Xuất verified-rules.json</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-[#DECDB8] flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-[#FAF7F2] px-3 py-2 rounded-xl border border-[#DECDB8]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo ID, tiêu đề, nội dung..."
              className="flex-1 bg-transparent focus:outline-hidden"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#DECDB8] bg-[#FAF7F2] font-semibold"
          >
            <option value="all">Tất cả 8 nhóm</option>
            <option value="ton-nghiem">Tôn nghiêm</option>
            <option value="vung-mien">Vùng miền</option>
            <option value="mau-sac">Màu sắc</option>
            <option value="phom-dang">Phom dáng</option>
            <option value="phu-kien">Phụ kiện</option>
            <option value="ngu-hanh">Ngũ hành</option>
            <option value="dong-bo">Đồng bộ gia đình</option>
            <option value="khen-ngoi">Khen ngợi</option>
          </select>

          <label className="flex items-center gap-1.5 font-semibold text-[#664422] cursor-pointer">
            <input
              type="checkbox"
              checked={onlyNeedsReview}
              onChange={(e) => setOnlyNeedsReview(e.target.checked)}
            />
            <span>Chỉ hiện luật “CẦN THẨM ĐỊNH” ({filteredRules.length})</span>
          </label>
        </div>

        {/* Rules List */}
        <div className="space-y-2.5">
          {filteredRules.slice(0, 60).map((rule) => {
            const rev = reviewsMap[rule.id];
            const effectiveSource = rev?.verified_source || rule.source;
            const isEditing = editingId === rule.id;

            return (
              <div key={rule.id} className="bg-white rounded-2xl p-4 border border-[#E0D5C1] text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {rule.id}
                    </span>
                    <span className="font-bold text-[#1D2440] text-sm">{rule.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        effectiveSource === 'CẦN THẨM ĐỊNH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {effectiveSource === 'CẦN THẨM ĐỊNH' ? 'Chờ thẩm định' : 'Đã thẩm định'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(isEditing ? null : rule.id);
                        setDraftSource(effectiveSource === 'CẦN THẨM ĐỊNH' ? '' : effectiveSource);
                        setDraftNotes(rev?.notes || '');
                      }}
                      className="px-3 py-1 rounded-lg font-bold bg-[#8B1A1A] text-white"
                    >
                      {isEditing ? 'Hủy' : 'Duyệt / Gắn nguồn'}
                    </button>
                  </div>
                </div>

                <p className="text-gray-600">{rule.message}</p>
                {effectiveSource !== 'CẦN THẨM ĐỊNH' && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Nguồn: {effectiveSource}
                  </p>
                )}

                {isEditing && (
                  <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={draftSource}
                      onChange={(e) => setDraftSource(e.target.value)}
                      placeholder="Nhập nguồn sách / trang (vd: Ngàn năm áo mũ, tr. 142)"
                      className="sm:col-span-2 px-3 py-1.5 rounded-lg border border-[#DECDB8] bg-[#FAF7F2]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveReview(rule.id)}
                      className="px-3 py-1.5 rounded-lg font-bold bg-[#1F6F5C] text-white"
                    >
                      Lưu xác nhận
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
