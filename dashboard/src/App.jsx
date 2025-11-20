import { useState } from 'react';
import CalendarView from './components/CalendarView';
import './components/calendar.css';
import { Button } from './components/Button';
import GuildDropdown from './components/GuildDropdown';

function App() {
  // 테스트용 더미 데이터
  const [attendanceDates, setAttendanceDates] = useState([
    '2025-11-17',
    '2025-11-19',
  ]);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">출석 캘린더</h1>
      <Button>로그인</Button>
      <CalendarView attendanceDates={attendanceDates} />
      <GuildDropdown />
    </div>
  );
}

export default App;
