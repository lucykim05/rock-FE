import pool from '../../db/database.js';
import { ATTENDANCE_QUERIES } from '../../db/queries/attendance.js';

// 현재 통계 가져오기
export async function getCurrentStats(userId) {
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

// 어제 출석했는지 확인
export async function checkYesterdayAttendance(userId, yesterday) {
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

// 통계 업데이트
export async function saveStats(userId, newStats) {
  const stats = await pool.query(ATTENDANCE_QUERIES.UPDATE_STATS, [
    userId,
    newStats.total,
    newStats.streak,
    newStats.maxStreak,
  ]); // 계산된 통계를 통해서 업데이트

  return stats;
}

// 이번달 출석일 수 조회
export async function getMonthlyCount(userId) {
  const now = new Date();
  const currYear = now.getFullYear();
  const currMonth = now.getMonth() + 1;

  const result = await pool.query(ATTENDANCE_QUERIES.GET_MONTHLY_STATS, [
    userId,
    currYear,
    currMonth,
  ]);

  return result;
}

// 출석 통계 가져오기
export async function getAttendanceStats(userId) {
  const result = await pool.query(ATTENDANCE_QUERIES.ATTENDANCE_STATS, [
    userId,
  ]);

  return result.rows[0] || null; // 통계 없는지 확인
}
