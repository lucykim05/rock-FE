import { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import './components/calendar.css';
import GuildDropdown from './components/GuildDropdown';
import Header from './components/Header';
import { PersonalStatsCard } from './components/PersonalStatsCard';
import { RankingCard } from './components/RankingCard';
import { supabase } from './database/supabaseClient';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [guildId, setGuildId] = useState('1435586389243854860');
  const [userId, setUserId] = useState('391098361924812800');
  const [attendanceDates, setAttendanceDates] = useState([]);

  // mock 데이터
  const personalStats = {
    attendanceCount: 3,
    streakDays: 2,
    studyTotal: 45,
  };

  const rankingData = [
    { username: '여빈', hours: 45 },
    { username: '희주', hours: 38 },
    { username: '돌쇠', hours: 32 },
    { username: '이슬', hours: 30 },
  ];

  useEffect(() => {
    if (!isLoggedIn || !userId || !guildId) return;

    (async () => {
      // 1️⃣ 출석 데이터
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('attendance_date')
        .eq('user_id', userId)
        .eq('guild_id', guildId);

      if (!attendanceError && attendanceData) {
        const dates = attendanceData.map((row) => {
          const date = new Date(row.attendance_date);
          date.setDate(date.getDate() - 1); // 하루 빼기(날짜를 가져오는데 다음날로 적용됨 시간대 때문)
          return date.toISOString().split('T')[0];
        });
        setAttendanceDates(dates);
      } else if (attendanceError) {
        console.error('Attendance fetch error:', attendanceError);
      }
    })();
  }, [isLoggedIn, userId, guildId]);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="px-4 pt-[120px] pb-6 md:px-8 lg:px-40">
        <div className="flex justify-end mb-4">
          <GuildDropdown />
        </div>

        <h1 className="text-2xl text-black mb-4">출석 캘린더</h1>
        <CalendarView attendanceDates={attendanceDates} />

        {personalStats && (
          <div className="flex justify-center gap-12 flex-wrap text-black">
            <PersonalStatsCard
              attendanceCount={personalStats.attendanceCount}
              streakDays={personalStats.streakDays}
              studyTotal={personalStats.studyTotal}
            />
            <RankingCard ranking={rankingData} />
          </div>
        )}
      </main>
    </>
  );
}
