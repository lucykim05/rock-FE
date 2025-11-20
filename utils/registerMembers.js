import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export async function registerMembers(client, guildId) {
  try {
    const guild = await client.guilds.fetch(guildId);
    const members = await guild.members.fetch();

    // 모든 멤버 등록
    for (const [id, member] of members) {
      await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [
        member.id,
        guildId,
        member.displayName,
        // 닉네임 등록
      ]);
    }

    return true;
  } catch (err) {
    console.error('기존 멤버 등록 중 오류');
    throw err;
  }
}
