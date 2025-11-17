import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

export default {
  name: 'registerMember',
  async execute(member) {
    try {
      await pool.query(ATTENDANCE_QUERIES.REGISTER_USER, [
        member.id,
        member.displayName,
      ]);
    } catch (error) {
      console.error('멤버 등록 실패');
    }
  },
};
