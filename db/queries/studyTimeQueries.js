export const STUDY_TIME_QUERIES = Object.freeze({
  FETCH_STUDY_CHANNEL_ID: `SELECT study_channel_id FROM settings WHERE guild_id = $1`,
  SAVE_STUDY_TIME: `INSERT INTO session (user_id, study_date, start_time, end_time, study_time, guild_id)
    VALUES( $1, $2, $3, $4, $5, $6)`,
  FETCH_DAILY_STUDY_TIME: `SELECT sum(study_time) as total_study_time FROM session WHERE user_id =$1 AND guild_id = $2 AND study_date = $3`,
  FETCH_WEEKLY_STUDY_TIME: `SELECT sum(study_time) as total_study_time FROM session WHERE user_id =$1 AND guild_id = $2 AND (study_date BETWEEN $3 AND $4)`,
  FETCH_MONTHLY_STUDY_TIME: `SELECT sum(study_time) as total_study_time FROM session WHERE user_id = $1 AND guild_id = $2 AND study_date like $3`,
});
