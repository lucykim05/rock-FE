import { supabase } from './supabase.js';

export const getAttendanceByGuild = async (guildId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('guild_id', guildId)
    .order('attendance_date', { ascending: false });

  if (error) throw error;
  return data;
};
