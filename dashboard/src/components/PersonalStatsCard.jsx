//개인 통계 카드

import { StatCard } from './StatCard';

export function PersonalStatsCard({ attendanceCount, streakDays, studyTotal }) {
  return (
    <StatCard title="개인 통계">
      <p>총 출석일: {attendanceCount}일</p>
      <p>연속 출석일: {streakDays}일</p>
      <p>총 공부시간: {studyTotal}시간</p>
    </StatCard>
  );
}
