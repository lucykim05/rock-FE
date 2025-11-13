import pool from '../../db/database.js';
import { ATTENDANCE_QUERIES } from '../../db/queries/attendance.js';

// 유저 등록
export async function registerUser(userId, username) {
  await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [userId, username]);
}

// 출석 등록
export async function registerAttendance(
  userId,
  today,
  currentTime,
  isMorning
) {
  const result = await pool.query(ATTENDANCE_QUERIES.REGISTER_ATTENDANCE, [
    userId,
    today,
    currentTime,
    isMorning,
  ]);
  return result.rows.length > 0;
}

// 메인 함수
export async function updateAttendanceStats(userId, yesterday) {
  const attendedYesterday = await checkYesterdayAttendance(userId, yesterday);
  const currentStats = await getCurrentStats(userId);
  const newStats = calculateNewStats(currentStats, attendedYesterday);
  await saveStats(userId, newStats);

  return newStats.streak;
}

// 어제 출석했는지 확인
async function checkYesterdayAttendance(userId, yesterday) {
  const yesterdayAttendance = await pool.query(
    ATTENDANCE_QUERIES.CHECK_YESTERDAY,
    [userId, yesterday]
  );

  let attendedYesterday = false;
  if (
    yesterdayAttendance.rows[0] &&
    yesterdayAttendance.rows[0].attended_yesterday
  ) {
    attendedYesterday = true;
  }

  return attendedYesterday;
}

// 현재 통계 가져오기
async function getCurrentStats(userId) {
  const currentStats = await pool.query(ATTENDANCE_QUERIES.GET_CURRENT_STATS, [
    userId,
  ]);

  const stats = currentStats.rows[0] || {
    total_attendance: 0,
    streak_days: 0,
    max_streak: 0,
  };

  return stats;
}

// 통계 계산
function calculateNewStats(stats, attendedYesterday) {
  const updateTotal = stats.total_attendance + 1;
  let updateStreak = 1;

  if (attendedYesterday) {
    updateStreak = stats.streak_days + 1;
  }

  const updateMaxStreak = Math.max(stats.max_streak, updateStreak);

  return {
    total: updateTotal,
    streak: updateStreak,
    maxStreak: updateMaxStreak,
  };
}

// 통계 업데이트
async function saveStats(userId, newStats) {
  await pool.query(ATTENDANCE_QUERIES.UPDATE_STATS, [
    userId,
    newStats.total,
    newStats.streak,
    newStats.maxStreak,
  ]);
}

// 출석 통계 조회
export async function getStats(userId) {
  const result = await pool.query(ATTENDANCE_QUERIES.ATTENDANCE_STATS, [
    userId,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
