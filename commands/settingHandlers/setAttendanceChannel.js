import pool from '../../db/database.js';
import { SETTING_QUERY } from '../../db/queries/setting.js';

export async function setAttendanceChannel(interaction) {
  const channel = interaction.options.getChannel('채널');
  const guildId = interaction.guildId;

  try {
    // 기존 데이터 확인
    const existing = await pool.query(SETTING_QUERY.CHECK_UNIQUE, [guildId]);

    if (existing.rows.length > 0) {
      // 기존 데이터 업데이트
      await pool.query(SETTING_QUERY.UPDATE_CHANNEL, [channel.id, guildId]);
    } else {
      // 데이터 삽입
      await pool.query(SETTING_QUERY.REGISTER_CHANNEL, [guildId, channel.id]);
    }

    await interaction.reply(`출석 채널이 ${channel}으로 설정되었습니다.`);
  } catch (error) {
    console.error('setAttendanceChannel 에러', error);
    await interaction.reply('설정 중 오류발생');
  }
}
