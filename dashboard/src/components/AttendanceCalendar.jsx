import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';
import { supabase } from '../database/supabaseClient';

export default function AttendanceCalendar({ guildId, userId }) {
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    if (!guildId || !userId) return;

    async function fetchAttendance() {
      const { data, error } = await supabase
        .from('attendance')
        .select('attendance_date')
        .eq('guild_id', guildId)
        .eq('user_id', userId);

      if (!error && data) {
        const dates = data.map((row) => {
          const date = new Date(row.attendance_date);
          date.setDate(date.getDate() - 1); // 하루 빼기(시간대 문제)
          return date.toISOString().split('T')[0];
        });
        setAttendanceDates(dates);
      } else if (error) {
        console.error('출석 데이터 오류', error);
      }
    }

    fetchAttendance();
  }, [guildId, userId]);

  return <CalendarView attendanceDates={attendanceDates} />;
}
