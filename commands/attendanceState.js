import { SlashCommandBuilder } from 'discord.js';
import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export default {
  data: new SlashCommandBuilder()
    .setName('통계')
    .setDescription('출석 현황을 확인합니다.'),

  async execute(interaction) {
    try {
      const result = await pool.query(ATTENDANCE_QUERIES.ATTENDANCE_STATS, [
        interaction.user.id,
      ]);

      if (result.rows.length === 0) {
        return interaction.reply('출석 기록이 없습니다요!');
      }

      const state = result.rows[0];
      return interaction.reply(
        `## 출석 통계\n` +
          `총 출석 : ${state.total_attendance}회 \n` +
          `현재 연속 ${state.streak_days}회 출석\n` +
          `최대 연속 ${state.max_streak}일 출석`
      );
    } catch (error) {
      console.error('출석통계 오류', error);
      return interaction.reply('출석 통계 오류');
    }
  },
};
