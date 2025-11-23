  import { useEffect, useState } from 'react';
  import CalendarView from './CalendarView';
  import { getAttendanceDate } from '../database/attendance.js';
  import { getStudyTimes } from '../database/studyTime.js';
  import { calculateDailyStudyTime } from '../utils/studyStats.js';

  export default function AttendanceCalendar({ guildId, userId }) {
    const [attendanceDates, setAttendanceDates] = useState([]);
    const [studyTimes, setStudyTimes] = useState({});
    
    useEffect(() => {
      if (!guildId || !userId) return;

      const fetchAttendance = async () =>  {
        try {
          const dates = await getAttendanceDate(guildId, userId);
          setAttendanceDates(dates);
      } catch(error){
        console.error(error)
      }
      }

      const fetchStudyTime = async () =>{
        const sessions = await getStudyTimes(guildId, userId);
        if (sessions) {
          // 날짜별로 합산
          const dailyStats = calculateDailyStudyTime(sessions); //{yyyy-mm-dd : time, ...} 형식
          setStudyTimes(dailyStats)
        }
      }

      fetchAttendance();
      fetchStudyTime();
    }, [guildId, userId]);

    return <CalendarView attendanceDates={attendanceDates} studyTimes = {studyTimes}/>;
  }
