import { useEffect, useRef, useState } from 'react';
import AttendanceCalendar from './components/AttendanceCalendar';
import './components/calendar.css';
import GuildDropdown from './components/GuildDropdown';
import Header from './components/Header';
import { PersonalStatsCard } from './components/PersonalStatsCard';
import { RankingCard } from './components/RankingCard';
import { DISCORD_LOGIN_URL } from './constants/constant.js';
import { code2AccessToken } from './login/loginFunctions.js';
export default function App() {
  const guildId = '1435586389243854860';
  const userId = '391098361924812800';
  const userName = '유저이름';

  //localStorage에 access token 여부로 로그인 여부 확인
  const [loginState, setLoginState] = useState(() => !!localStorage.getItem('discord_access_token'));
  
  //로그인 버튼 클릭 시 디스코드 로그인하는 화면으로 이동
  const handleDiscordLogin = () =>{
    console.log('디스코드 로그인 실행')
    window.location.href = DISCORD_LOGIN_URL; 
  }
  
  //로그아웃 버튼 클릭시 logainState false 및 localStorage에 저장된 access_token 삭제
  const handleDiscordLogout= () => {
    setLoginState(false);
    localStorage.removeItem('discord_access_token');
    console.log("로그아웃");
  }

  const hasRequestedAccessToken = useRef(false); // 이미 요청했는지 체크
  useEffect(() => {
    const handleLogin = async () => {
      const url = window.location.search;
      const isConvertSuccess = await code2AccessToken(url, hasRequestedAccessToken);
      if(isConvertSuccess)
        setLoginState(true);
    };

  handleLogin();

}, []); 

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
      <Header isLoggedIn={loginState} onLogin={handleDiscordLogin} onLogout={handleDiscordLogout} />

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
