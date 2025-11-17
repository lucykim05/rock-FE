import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export async function registerMembers(client) {
  try {
    const guildId = process.env.GUILD_ID;

    const guild = await client.guilds.fetch(guildId);
    const members = await guild.members.fetch();

    // for문으로 모든 member들을 등록함
    for (const [id, member] of members) {
      await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [
        member.id,
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
