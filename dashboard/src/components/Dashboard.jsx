import { PersonalStatsCard } from './PersonalStatsCard.jsx';
import { RankingCard } from './RankingCard.jsx';
import GuildDropdown from './GuildDropdown.jsx';
import AttendanceCalendar from './AttendanceCalendar.jsx';
import { useEffect, useRef } from 'react';
import { getGuildInfo  } from '../guildDropdown/getGuild.js';

export default function Dashboard (){
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

    //한 번만 실행되게 useRef 사용
    const hasFetchedGuild = useRef(false);
    useEffect(()=>{
        getGuildInfo(hasFetchedGuild);
    }, [])


    return (
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
    )
}