import { supabase } from './supabase.js';

export const getSessionsByUser = async (userId) => {
  const { data, error } = await supabase
    .from('session')
    .select('*')
    .eq('user_id', userId)
    .order('start_time', { ascending: false });

  if (error) throw error;
  return data;
};

export const getStudyTimeByDate = async (userId, guildId) => {
  const { data, error } = await supabase
    .from('session')
    .select('study_date, study_time')
    .eq('user_id', userId)
    .eq('guild_id', guildId);

  if (error) throw error;

  // 날짜별 합산 (JS에서 sum)
  const result = data.reduce((acc, cur) => {
    if (!acc[cur.study_date]) {
      acc[cur.study_date] = 0;
    }
    acc[cur.study_date] += cur.study_time; // 분 단위 합산
    return acc;
  }, {});

  return result;
};
