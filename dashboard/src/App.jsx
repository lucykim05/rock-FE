import { useEffect, useRef, useState } from 'react';
import './components/calendar.css';
import Header from './components/Header';
import { code2AccessToken } from './api/accessToken.js';
import Dashboard from './components/Dashboard.jsx';
import LandingPage from './components/LandingPage.jsx';
export default function App() {


  //localStorage에 access token 여부로 로그인 여부 확인
  const [loginState, setLoginState] = useState(() => !!localStorage.getItem('discord_access_token'));
  const [isMainVisible, setIsMainVisible] = useState(loginState);
  
  //로그아웃 버튼 클릭시 logainState false 및 localStorage에 저장된 access_token 삭제
  const handleDiscordLogout= () => {
    alert('로그아웃 했습니다!')
    
    setLoginState(false);
    setIsMainVisible(false);
    localStorage.removeItem('discord_access_token');

    console.log("로그아웃");
  }

  const hasRequestedAccessToken = useRef(false); // 이미 요청했는지 체크
  useEffect(() => {
      const handleLogin = async () => {
      const url = window.location.search;
      const isConvertSuccess = await code2AccessToken(url, hasRequestedAccessToken);
      if(isConvertSuccess){
        setLoginState(true);
        setIsMainVisible(true);
      }
    };

  handleLogin();

}, []); 

return (
    <>
      <Header isLoggedIn={loginState} onLogout={handleDiscordLogout} />

     { isMainVisible 
     ? <Dashboard /> : <LandingPage/> }
    </>
  );
}
