// Lớp đo lường sự kiện ẩn danh (Analytics) — Không thu thập PII, tắt khi chạy AutoDemoTour
import { getSupabaseClient } from '../services/supabase';
import { loadJson, saveJson } from './storage';

const LOCAL_ANALYTICS_KEY = 'vpr_analytics_events';

let sessionId = null;
let sessionStartMs = Date.now();
let firstOutfitCompleted = false;
let tourSuppression = false;

export function getSessionId() {
  if (!sessionId) {
    sessionId = `sess-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  }
  return sessionId;
}

export function setAnalyticsTourMode(isTourRunning) {
  tourSuppression = Boolean(isTourRunning);
}

export function resetAnalyticsSessionForTest() {
  sessionId = null;
  sessionStartMs = Date.now();
  firstOutfitCompleted = false;
  tourSuppression = false;
}

export function track(eventName, props = {}) {
  if (tourSuppression || !eventName) return null;

  const entry = {
    session_id: getSessionId(),
    event_name: eventName,
    props,
    created_at: new Date().toISOString()
  };

  const localList = loadJson(LOCAL_ANALYTICS_KEY, []);
  saveJson(LOCAL_ANALYTICS_KEY, [...(Array.isArray(localList) ? localList.slice(-99) : []), entry]);

  const client = getSupabaseClient();
  if (client) {
    client.from('analytics_events').insert({
      session_id: entry.session_id,
      event_name: entry.event_name,
      props: entry.props
    }).then(() => {});
  }

  return entry;
}

export function trackFirstCompleteOutfit(hasCustomized) {
  if (tourSuppression || firstOutfitCompleted || !hasCustomized) return null;
  firstOutfitCompleted = true;
  const elapsedSeconds = Math.max(1, Math.round((Date.now() - sessionStartMs) / 1000));
  return track('first_complete_outfit', { elapsedSeconds });
}
