import AttendanceCalendar from './AttendanceCalendar.jsx';
import { AttendanceRankingCard } from './AttendanceRankingCard.jsx';
import { StudyRankingCard } from '././StudyRankingCard.jsx';

export default function DashboardContent({
  userDisplayName,
  userId,
  selectedGuild,
}) {
  // mock 데이터
  const ranking = [
    { username: '희주', days: 12 },
    { username: '여빈', days: 9 },
    { username: '이슬', days: 7 },
  ];

  const rankingData = [
    { username: '여빈', hours: 45 },
    { username: '희주', hours: 38 },
    { username: '돌쇠', hours: 32 },
    { username: '이슬', hours: 30 },
  ];

  return (
    <>
      <AttendanceCalendar guildId={selectedGuild.id} userId={userId} />
      <div className="flex justify-center gap-12 flex-wrap text-black mt-6">
        <AttendanceRankingCard ranking={ranking} />
        <StudyRankingCard ranking={rankingData} />
      </div>
    </>
  );
}
