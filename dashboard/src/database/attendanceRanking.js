/**
 * 데이터 가져와서
 *  {username, max_streak}로 반환
 */

import { supabase } from './supabaseClient.js';

export const attendanceRanking = async (selectedGuildId) => {
  try {
    const { data, error } = await supabase
      .from('states')
      .select(
        `max_streak,
        user:user_id (username)`
      )
      .eq('guild_id', selectedGuildId)
      .order('max_streak', { ascending: false });

    if (error) throw error;

    // username과 max_streak 형태로 반환
    return data.map((item) => ({
      username: item.user.username,
      max_streak: item.max_streak,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};
