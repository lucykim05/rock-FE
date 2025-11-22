import {
  checkYesterdayAttendance,
  getCurrentStats,
  saveStats,
  getMonthlyCount,
  getAttendanceStats,
} from './attendanceData.js';

// 메인 함수
export async function updateAttendanceStats(userId, guildId, yesterday) {
  const attendedYesterday = await checkYesterdayAttendance(
    userId,
    guildId,
    yesterday
  );
  const currentStats = await getCurrentStats(userId, guildId);
  const newStats = calculateNewStats(currentStats, attendedYesterday);
  await saveStats(userId, guildId, newStats);

  return newStats.streak;
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

// 출석 통계 조회
export async function getStats(userId, guildId) {
  const result = await getAttendanceStats(userId, guildId);

  const monthlyRate = await calculateMonthlyAttendance(userId, guildId);

  return {
    ...result,
    monthlyRate,
  };
}

export async function calculateMonthlyAttendance(userId, guildId) {
  const now = new Date();
  const currYear = now.getFullYear();
  const currMonth = now.getMonth() + 1;

  const daysInMonth = new Date(currYear, currMonth, 0).getDate();

  const result = await getMonthlyCount(userId, guildId);
  const monthlyCount = result.rows[0]?.count || 0;
  const monthlyRate = Math.round((monthlyCount / daysInMonth) * 100);

  return monthlyRate;
}
