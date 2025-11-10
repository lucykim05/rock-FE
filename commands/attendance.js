import { SlashCommandBuilder } from 'discord.js';
import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export default {
  data: new SlashCommandBuilder()
    .setName('출석')
    .setDescription('오늘의 출석을 체크합니다'),

  async execute(interaction) {
    const userId = interaction.user.id;
    const username = interaction.user.username;

    try {
      // 사용자 등록
      await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [userId, username]);

      const { todayKST, isMorning } = this.getKoreanTime();

      // 출석 체크
      const result = await pool.query(ATTENDANCE_QUERIES.REGISTER_ATTENDANCE, [
        userId,
        todayKST,
        isMorning,
      ]);

      // 통계 업데이트
      if (result.rows.length > 0) {
        // 새 기록인 경우
        await pool.query(ATTENDANCE_QUERIES.UPDATE_STATS, [userId]);
        const streakCount = await this.updateStreak(userId);

        const morning = isMorning ? '아침 출석에 성공했습니다요!🎉' : '';

        await interaction.reply(
          `<@${userId}> 마님, 출석이 완료 됐습니다요! ${morning}\n\n` +
            `연속 출석 ${streakCount}일 째입니다요!`
        );
      } else {
        await interaction.reply(`마님, 오늘 건 이미 찍었슈!`);
      }
    } catch (error) {
      console.error('출석 오류', error);
      await interaction.reply('이런, 뭔가 꼬였는갑네… 출석이 안 됐습니다요!');
    }
  },

  getKoreanTime() {
    const now = new Date();

    // 한국 시간으로 변환
    const koreaTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    );

    // YYYY-MM-DD 형식으로 변환
    const year = koreaTime.getFullYear();
    const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
    const day = String(koreaTime.getDate()).padStart(2, '0');
    const todayKST = `${year}-${month}-${day}`;

    // 아침 출석
    const hour = koreaTime.getHours();
    const isMorning = hour >= 6 && hour < 9;

    return { todayKST, isMorning };
  },

  async updateStreak(userId) {
    await pool.query(ATTENDANCE_QUERIES.UPDATE_STATS, [userId]);

    const stats = await pool.query(ATTENDANCE_QUERIES.GET_STREAKDAYS, [userId]);
    return stats.rows[0]?.streak_days || 1;
  },
};
