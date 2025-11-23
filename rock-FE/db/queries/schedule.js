export const SCHEDULE_QUERIES = {
  GET_TIME: `SELECT attendance_channel_id, attendance_time FROM settings WHERE guild_id = $1`,

  GET_ID: `SELECT guild_id FROM settings`,
};
