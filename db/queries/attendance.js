// 출석처리 쿼리

export const ATTENDANCE_QUERIES = {
  // 사용자 등록
  REGISTER_USER: `INSERT INTO users (user_id, username)
  VALUES ($1, $2)
  ON CONFLICT (user_id) DO NOTHING -- 기존 유저면 아무것도 안해도 됨`,

  // 출석 등록
  REGISTER_ATTENDANCE: `INSERT INTO attendance (user_id, attendance_date, attendance_time, is_morning)
  VALUES ($1, $2, $3, $4) -- 변수로 4개 다 전달 
  ON CONFLICT (user_id, attendance_date) DO NOTHING -- 기존에 출석했으면 아무것도 안해도 됨
  RETURNING attendance_id`,

  // 어제 출석 여부 확인
  CHECK_YESTERDAY: `SELECT EXISTS (
    SELECT 1 FROM attendance -- attendance 정보 있는지 확인
    WHERE user_id = $1 AND attendance_date = $2 -- $2는 어제 날짜
  ) AS attended_yesterday`,

  GET_CURRENT_STATS: `SELECT total_attendance, streak_days, max_streak
  FROM states
  WHERE user_id = $1`,

  UPDATE_STATS: `INSERT INTO states (user_id, total_attendance, streak_days, max_streak)
  VALUES($1, $2, $3, $4)
  ON CONFLICT(user_id) DO UPDATE -- 기존 유저면
  SET -- 내용 업데이트
    total_attendance = $2, 
    streak_days = $3,
    max_streak = $4,
    updated_at = NOW()`,

  // 전체 통계
  ATTENDANCE_STATS: `SELECT user_id, total_attendance, streak_days, max_streak
  FROM states
  WHERE user_id = $1`,

  // 이번달 통계
  GET_MONTHLY_STATS: `SELECT COUNT(*) as count
  FROM attendance
  WHERE user_id = $1
    AND EXTRACT(YEAR FROM attendance_date) = $2
    AND EXTRACT(MONTH FROM attendance_date) = $3`,

  GET_RANKING: `SELECT states.user_id, states.total_attendance, users.username
  FROM states, users
  WHERE states.user_id = users.user_id
  ORDER BY states.total_attendance DESC
  LIMIT 5
  `,
};
