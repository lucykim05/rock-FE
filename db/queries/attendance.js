// 출석처리 쿼리

export const ATTENDANCE_QUERIES = {
  // 사용자 등록
  REGISTER_USER: `INSERT INTO users (user_id, username)
  VALUES ($1, $2)
  ON CONFLICT (user_id) DO UPDATE SET username = $2`,

  // 출석 등록
  REGISTER_ATTENDANCE: `INSERT INTO attendance (user_id, attendance_date, attendance_time, is_morning)
  VALUES ($1, $2, CURRENT_TIME, $3)
  ON CONFLICT (user_id, attendance_date) DO NOTHING
  RETURNING attendance_id`,

  // 통계 업데이트
  UPDATE_STATS: `
  WITH yesterday_attendance AS (
    SELECT EXISTS (
      SELECT 1 FROM attendance 
      WHERE user_id = $1 
      AND attendance_date = CURRENT_DATE - INTERVAL '1 day'
    ) AS attended_yesterday
  ),
  new_streak AS (
    SELECT 
      CASE 
        WHEN (SELECT attended_yesterday FROM yesterday_attendance) 
        THEN COALESCE((SELECT streak_days FROM states WHERE user_id = $1), 0) + 1
        ELSE 1
      END AS streak_value
  )
  INSERT INTO states (user_id, total_attendance, streak_days, max_streak)
  VALUES ($1, 1, (SELECT streak_value FROM new_streak), (SELECT streak_value FROM new_streak))
  ON CONFLICT (user_id) DO UPDATE 
  SET 
    total_attendance = states.total_attendance + 1,
    streak_days = (SELECT streak_value FROM new_streak),
    max_streak = GREATEST(states.max_streak, (SELECT streak_value FROM new_streak)),
    updated_at = NOW()
`,

  GET_STREAKDAYS: `SELECT streak_days FROM states WHERE user_id=$1`,

  // 이번달 통계
  ATTENDANCE_STATS: `SELECT user_id, total_attendance, streak_days, max_streak
  FROM states
  WHERE user_id = $1`,
};
