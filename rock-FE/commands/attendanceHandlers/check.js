import { processAttendance } from './processAttendance.js';
import { ATTENDANCE } from '../../constants/messages.js';

export async function checkAttendance(interaction) {
  const userId = interaction.user.id;
  const guildId = interaction.guildId;
  const username = interaction.member.displayName;

  try {
    await interaction.deferReply();

    const result = await processAttendance(userId, guildId, username);

    if (result.alreadyChecked) {
      await interaction.editReply(ATTENDANCE.ALREADY_CHECKED);
      return;
    }

    const morning = result.isMorning ? ATTENDANCE.MORNING_ATTEND : '';
    const message =
      `<@${userId}> 마님, 출석이 완료 됐습니다요! ${morning}\n\n` +
      `연속 출석 ${result.streakDays}일 째입니다요!`;

    await interaction.editReply(message);
  } catch (error) {
    console.error('출석 오류', error);

    try {
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply(ATTENDANCE.ERROR_ATTEND);
      } else {
        await interaction.reply(ATTENDANCE.ERROR_ATTEND);
      }
    } catch (replyError) {
      console.error('에러 메시지 전송 실패:', replyError);
    }
  }
}
