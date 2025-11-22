import { supabase } from './supabase.js';

export const getTopStudyUsers = async (guildId) => {
  const { data, error } = await supabase
    .from('states')
    .select('user_id, total_study_minutes')
    .eq('guild_id', guildId)
    .order('total_study_minutes', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
};
