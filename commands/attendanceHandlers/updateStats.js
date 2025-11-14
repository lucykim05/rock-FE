import pool from '../../db/database.js';
import { ATTENDANCE_QUERIES } from '../../db/queries/attendance.js';

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

  if (
    yesterdayAttendance.rows[0] &&
    yesterdayAttendance.rows[0].attended_yesterday
  ) {
    return true;
  }

  return false; // return 값 boolean
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
  }; // 통계가 없으면 0으로 가져오기

  return stats;
}

// 통계 계산
function calculateNewStats(stats, attendedYesterday) {
  const updateTotal = stats.total_attendance + 1;
  let updateStreak = 1;

  if (attendedYesterday) {
    updateStreak = stats.streak_days + 1;
  } // 어제 기록이 있으면 +1

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
  ]); // 계산된 통계를 통해서 업데이트
}

// 출석 통계 조회
export async function getStats(userId) {
  const result = await pool.query(ATTENDANCE_QUERIES.ATTENDANCE_STATS, [
    userId,
  ]);

  if (result.rows.length === 0) {
    return null;
  } // 통계 없는지 확인 위해 null return

  const stats = result.rows[0];
  const monthlyRate = await calculateMonthlyAttendance(userId);

  return {
    ...stats,
    monthlyRate,
  };
}

export async function calculateMonthlyAttendance(userId) {
  const now = new Date();
  const currYear = now.getFullYear();
  const currMonth = now.getMonth() + 1;

  const daysInMonth = new Date(currYear, currMonth, 0).getDate();

  const result = await pool.query(ATTENDANCE_QUERIES.GET_MONTHLY_STATS, [
    userId,
    currYear,
    currMonth,
  ]);

  const monthlyCount = result.rows[0]?.count || 0;
  const monthlyRate = Math.round((monthlyCount / daysInMonth) * 100);

  return monthlyRate;
}
