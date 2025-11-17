import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export async function registerMembers(client) {
  try {
    const guildId = process.env.GUILD_ID;

    const guild = await client.guilds.fetch(guildId);

    const members = await guild.members.fetch();

    for (const [id, member] of members) {
      await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [
        member.id,
        member.displayName,
      ]);
    }

    return true;
  } catch (err) {
    console.error('기존 멤버 등록 중 오류');
    throw err;
  }
}
