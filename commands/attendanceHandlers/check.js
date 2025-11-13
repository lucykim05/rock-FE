import { processAttendance } from './processAttendance.js';
import { ATTENDANCE } from '../../constants/messages.js';

export async function checkAttendance(interaction) {
  const userId = interaction.user.id;
  const username = interaction.user.username;

  try {
    const result = await processAttendance(userId, username);
    // 출석 등록 및 통계 업데이트

    if (result.alreadyChecked) {
      await interaction.reply(ATTENDANCE.ALREADY_CHECKED);
      return;
    }
    // 중복 출석이면 alreadychecked true로 반환하게 해둠

    const morning = result.isMorning ? ATTENDANCE.MORNING_ATTEND : '';
    const message =
      `<@${userId}> 마님, 출석이 완료 됐습니다요! ${morning}\n\n` +
      `연속 출석 ${result.streakDays}일 째입니다요!`;

    await interaction.reply(message);
  } catch (error) {
    console.error('출석 오류', error);
    await interaction.reply(ATTENDANCE.ERROR_ATTEND);
  }
}
