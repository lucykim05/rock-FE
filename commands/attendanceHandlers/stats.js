import { ATTENDANCE } from '../../constants/messages.js';
import { getStats } from './updateStats.js';

export async function getAttendanceStats(interaction) {
  try {
    // 통계 가져오기
    const stats = await getStats(interaction.user.id);

    if (!stats) {
      return interaction.reply(ATTENDANCE.NO_RECORD);
    } // 통계 없으면 기록 없다 출력

    const message =
      `## 출석 현황\n` +
      `총 출석 : ${stats.total_attendance}회 \n` +
      `현재 연속 ${stats.streak_days}회 출석\n` +
      `최대 연속 ${stats.max_streak}일 출석`;

    await interaction.reply(message);
  } catch (error) {
    console.error('출석통계 오류', error);
    await interaction.reply(ATTENDANCE.ERROR_ATTENDSTATS);
  }
}
