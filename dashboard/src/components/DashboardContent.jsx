  import AttendanceCalendar from './AttendanceCalendar.jsx';
  import { PersonalStatsCard } from './PersonalStatsCard.jsx';
  import { RankingCard } from './RankingCard.jsx';

export default function DashboardContent(){
    const guildId = '1435586389243854860';
          const userId = '391098361924812800';
          
    
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
            <AttendanceCalendar guildId={guildId} userId={userId} />
            <div className="flex justify-center gap-12 flex-wrap text-black mt-6">
                <PersonalStatsCard {...personalStats} />
                <RankingCard ranking={rankingData} />
            </div>
        </>
    );
}