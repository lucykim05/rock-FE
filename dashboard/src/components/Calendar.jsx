import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';

export default function AttendancePage({ guildId }) {
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      const res = await fetch(
        `http://localhost:3000/guild/${guildId}/attendance`
      );
      const data = await res.json();

      // API 결과에서 attendance_date만 추출
      const dates = data.map((item) => item.attendance_date);
      setAttendanceDates(dates);
    }

    fetchAttendance();
  }, [guildId]);

  return <CalendarView attendanceDates={attendanceDates} />;
}
