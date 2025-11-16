export const SETTING_QUERY = {
  // 채널 등록
  REGISTER_CHANNEL: `INSERT INTO settings (guild_id, attendance_channel_id) VALUES ($1, $2)`,

  CHECK_UNIQUE: `SELECT id FROM settings WHERE guild_id = $1`,

  UPDATE_CHANNEL: `UPDATE settings
    SET attendance_channel_id = $1 
    WHERE guild_id = $2`,
};
