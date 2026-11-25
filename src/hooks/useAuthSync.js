import { useState, useEffect, useCallback } from 'react';
import { getSupabaseClient } from '../services/supabase';
import { hasSupabaseConfig } from '../config/env';

export function useAuthSync({ savedOutfits = [], earnedBadges = [] } = {}) {
  const [user, setUser] = useState(null);
  const enabled = hasSupabaseConfig();

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) return;

    client.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Đồng bộ tủ đồ & huy hiệu lên Supabase khi đã đăng nhập
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client || !user) return;

    if (savedOutfits.length > 0) {
      const rows = savedOutfits.map((item) => ({
        user_id: user.id,
        client_key: item.id,
        outfit: item.outfit,
        harmony_score: item.harmonyScore || 0,
        culture_status: item.cultureStatus || 'green'
      }));
      client.from('saved_outfits').upsert(rows, { onConflict: 'user_id,client_key' }).then(() => {});
    }

    if (earnedBadges.length > 0) {
      const badgeRows = earnedBadges.map((garmentId) => ({
        user_id: user.id,
        garment_id: garmentId
      }));
      client.from('user_badges').upsert(badgeRows, { onConflict: 'user_id,garment_id' }).then(() => {});
    }
  }, [user, savedOutfits, earnedBadges]);

  const signInWithGoogle = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) return;
    await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + window.location.pathname }
    });
  }, []);

  const signOut = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) return;
    await client.auth.signOut();
  }, []);

  return {
    enabled,
    user,
    signInWithGoogle,
    signOut
  };
}
