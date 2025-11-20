import pool from '../../db/database.js';
import { SETTING_QUERY } from '../../db/queries/setting.js';
import { scheduleManager } from '../../events/alarm/schedule.js';

export async function setAttendanceTime(interaction) {
  const guildId = interaction.guildId;
  const kstHour = interaction.options.getInteger('시간');
  const kstMinute = interaction.options.getInteger('분') || 0;

  try {
    let utcHour = kstHour - 9;
    let utcMinute = kstMinute;

    if (utcHour < 0) {
      utcHour += 24;
    }
    const timeSetting = `${utcMinute} ${utcHour} * * *`;

    const result = await pool.query(SETTING_QUERY.UPDATE_TIME, [
      timeSetting,
      guildId,
    ]);

    if (result.rowCount === 0)
      return interaction.reply('채널을 먼저 설정해주세요.');

    await scheduleManager.setupAttendance(guildId);

    console.log('출석 설정 변경');

    return interaction.reply(
      `출석 시간이 ${hour}시 ${minute}분으로 설정되었습니다.`
    );
  } catch (error) {
    console.error(error);
    return interaction.reply('출석 시간 세팅 오류');
  }
}
