import { ATTENDANCE } from '../../constants/messages.js';
import pool from '../../db/database.js';
import { ATTENDANCE_QUERIES } from '../../db/queries/attendance.js';

export async function getAttendanceRanking(interaction) {
  try {
    const guildId = interaction.guildId;
    const result = await pool.query(ATTENDANCE_QUERIES.GET_RANKING, [guildId]);

    if (result.rows.length === 0) {
      return ATTENDANCE.NO_RANKING;
    }

    const ranking = result.rows
      .map(
        (row, index) =>
          `${index + 1}위: ${row.username} - ${row.total_attendance}회`
      )
      .join('\n');

    await interaction.reply(`## 🥇 출석 순위 \n ${ranking}`);
  } catch (error) {
    console.error('순위 조회 오류', error);
    await interaction.reply('순위 오류');
  }
}
