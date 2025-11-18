export const SETTING_QUERY = {
  // 채널 등록
  REGISTER_CHANNEL: `INSERT INTO settings (guild_id, attendance_channel_id) VALUES ($1, $2)`,

  REGISTER_VOICE_CHANNEL: `INSERT INTO settings (guild_id, study_channel_id)
    VALUES($1, $2)`,

  CHECK_UNIQUE: `SELECT guild_id FROM settings WHERE guild_id = $1`,

  UPDATE_CHANNEL: `UPDATE settings
    SET attendance_channel_id = $1 
    WHERE guild_id = $2`,

  UPDATE_VOICE_CHANNEL: `UPDATE settings
    SET study_channel_id = $1
    WHERE guild_id = $2`,

  UPDATE_TIME: `UPDATE settings
    SET attendance_time = $1
    WHERE guild_id = $2`,
};
