import React from 'react';
import { Button } from './Button';

const Header = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-screen bg-white shadow-md z-50 px-10 py-5 flex flex-row justify-between items-center">
      {/* 로고 */}
      <img src="/r0ckFE-logo.png" alt="로고" className="h-12" />

      {/* 버튼들 */}
      <div className="flex gap-4">
        <Button
          onClick={() =>
            window.open('https://github.com/woowa-discord/rock-FE', '_blank')
          }
        >
          Contact
        </Button>
        {isLoggedIn ? (
          <Button onClick={onLogout}>로그아웃</Button>
        ) : (
          <Button onClick={onLogin}>로그인</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
