import pool from '../db/database.js';
import { ATTENDANCE_QUERIES } from '../db/queries/attendance.js';

/**
 * 봇 실행 후에 들어온 사람(new member) 등록
 * 새로 들어온 사람은 event나 command가 발생되었을 때 등록되게함
 * 기존에 있었던 사람은 봇 실행이 되면서 등록됨(index.js)
 */

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
