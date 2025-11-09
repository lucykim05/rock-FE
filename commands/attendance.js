// commands/출석.js
import { SlashCommandBuilder } from 'discord.js';
import pool from '../db/database.js';

export default {
  data: new SlashCommandBuilder()
    .setName('출석')
    .setDescription('오늘의 출석을 체크합니다'),

  async execute(interaction) {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    try {
      // 사용자 등록
      await pool.query(
        `INSERT INTO users (user_id, username)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET username = $2`,
        [userId, username]
      );

      // 출석 체크
      const today = new Date();
      const isMorning = today.getHours() < 9;

      const result = await pool.query(
        `INSERT INTO attendance (user_id, attendance_date, attendance_time, is_morning)
         VALUES ($1, CURRENT_DATE, CURRENT_TIME, $2)
         ON CONFLICT (user_id, attendance_date) DO NOTHING
         RETURNING attendance_id`,
        [userId, isMorning]
      );

      if (result.rows.length > 0) {
        // 통계 업데이트
        await pool.query(
          `INSERT INTO states (user_id, total_attendance)
           VALUES ($1, 1)
           ON CONFLICT (user_id) DO UPDATE 
           SET total_attendance = states.total_attendance + 1,
               updated_at = NOW()`,
          [userId]
        );

        await interaction.reply(`출석 완료!`);
      } else {
        await interaction.reply(`오늘은 이미 출석하셨습니다.`);
      }
    } catch (error) {
      console.error('출석 오류', error);
      await interaction.reply('출석 처리 중 오류가 발생했습니다.');
    }
  },
};
