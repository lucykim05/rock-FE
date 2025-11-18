import { updateAttendanceStats } from './updateStats.js';
import {
  getKoreanTime,
  formatKSTDate,
  formatKSTTime,
  getYesterdayKST,
  isMorningTime,
} from '../../utils/time.js';
import { ATTENDANCE_QUERIES } from '../../db/queries/attendance.js';
import pool from '../../db/database.js';

export async function processAttendance(userId, username) {
  const koreanTime = getKoreanTime();
  const today = formatKSTDate(koreanTime);
  const currentTime = formatKSTTime(koreanTime);
  const yesterday = getYesterdayKST();
  const isMorning = isMorningTime();

  // 출석 등록
  const result = await pool.query(ATTENDANCE_QUERIES.REGISTER_ATTENDANCE, [
    userId,
    today,
    currentTime,
    isMorning,
  ]);

  if (result.rows.length === 0) {
    return { alreadyChecked: true };
  } // 중복 출석이면 alreadyChecked를 true로 return -> 내부 확인 후에 출력하도록

  // 통계 업데이트
  const streakDays = await updateAttendanceStats(userId, yesterday);

  return {
    streakDays,
    isMorning,
  }; // 연속 출석일 수, 아침 출석 여부
}
