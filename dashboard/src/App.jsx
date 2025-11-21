import AttendanceCalendar from './components/AttendanceCalendar';
import './components/calendar.css';
import GuildDropdown from './components/GuildDropdown';
import Header from './components/Header';
import { PersonalStatsCard } from './components/PersonalStatsCard';
import { RankingCard } from './components/RankingCard';

export default function App() {
  const guildId = '1435586389243854860';
  const userId = '391098361924812800';
  const userName = '유저이름';

  // mock 데이터
  const personalStats = { attendanceCount: 3, streakDays: 2, studyTotal: 45 };
  const rankingData = [
    { username: '여빈', hours: 45 },
    { username: '희주', hours: 38 },
    { username: '돌쇠', hours: 32 },
    { username: '이슬', hours: 30 },
  ];

  return (
    <>
      <Header isLoggedIn={true} onLogin={() => {}} onLogout={() => {}} />

      <main className="px-4 pt-[120px] pb-6 md:px-8 lg:px-40">
        {/* 유저네임 + 드롭다운 */}
        <div className="flex justify-between items-center mb-4">
          {/* 왼쪽: 유저네임 */}
          <span className="text-black text-xl font-semibold">
            {userName}님의 Dashboard
          </span>

          {/* 오른쪽: Guild Dropdown */}
          <GuildDropdown />
        </div>

        <AttendanceCalendar guildId={guildId} userId={userId} />

        <div className="flex justify-center gap-12 flex-wrap text-black mt-6">
          <PersonalStatsCard {...personalStats} />
          <RankingCard ranking={rankingData} />
        </div>
      </main>
    </>
  );
}
