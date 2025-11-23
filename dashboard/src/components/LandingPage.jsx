import { DISCORD_LOGIN_URL_DEPLOY, DISCORD_LOGIN_URL_LOCAL } from '../constants/constant.js';

export default function LandingPage (){
    //로그인 버튼 클릭 시 디스코드 로그인하는 화면으로 이동
    const handleDiscordLogin = () =>{
    console.log('디스코드 로그인 실행')
    window.location.href = DISCORD_LOGIN_URL_DEPLOY; 
  }
    return (
        // 랜딩페이지 디자인
        <main className="flex flex-col items-center justify-center h-[calc(100vh-0px)] px-6 text-center">
          <div className="max-w-2xl space-y-8 animate-fade-in-up">
            
            {/* 타이틀 영역 */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                우아한 스터디,<br />
                <span className="text-indigo-600">돌쇠</span>와 함께
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                로그인으로 한 번으로 간편하게.<br className="md:hidden" /> 
                <br/>
                나의 출석 현황과 스터디 랭킹을 한 눈에 확인하세요.
              </p>
            </div>

            {/* 메인 로그인 버튼 */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleDiscordLogin}
                className="group relative px-8 py-4 text-lg font-bold text-white bg-[#5865F2] rounded-full hover:bg-[#4752C4] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                   {/* 디스코드 아이콘 느낌의 SVG */}
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419z"/></svg>
                   Discord로 3초 만에 시작하기
                </span>
              </button>
              
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1435546320927592480&permissions=8&integration_type=0&scope=bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow"
              >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
                서버에 돌쇠 초대하기
              </a>
              <p className="text-sm text-gray-400">
                로그인 후 모든 서비스를 이용할 수 있습니다.
              </p>
            </div>
          </div>
        </main>
    )
}