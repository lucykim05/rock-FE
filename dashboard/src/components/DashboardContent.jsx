import { useState, useEffect } from 'react';
import AttendanceCalendar from './AttendanceCalendar.jsx';
import { AttendanceRankingCard } from './AttendanceRankingCard.jsx';
import { StudyRankingCard } from './StudyRankingCard.jsx';
import { attendanceRanking } from '../database/attendanceRanking.js';
import { getWeeklyStudyRanking } from '../database/studyTime.js';

export default function DashboardContent({
  userDisplayName,
  userId,
  selectedGuild,
}) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    if (!selectedGuild?.id) return;

    // 출석 데이터
    const getAttendanceData = async () => {
      try {
        const data = await attendanceRanking(selectedGuild.id);
        setAttendanceData(data);
      } catch (err) {
        console.error(err);
        setAttendanceData([]);
      }
    };

    // 공부시간 데이터
    const getStudyData = async () => {
      try {
        const data = await getWeeklyStudyRanking(selectedGuild);
        setStudyData(data);
      } catch (err) {
        console.error(err);
        setStudyData([]);
      }
    };

    getAttendanceData();
    getStudyData();
  }, [selectedGuild?.id]);

  return (
    <>
      <AttendanceCalendar guildId={selectedGuild.id} userId={userId} />
      <div className="flex justify-center gap-12 flex-wrap text-black mt-6">
        <AttendanceRankingCard ranking={attendanceData} />
        <StudyRankingCard ranking={studyData} />
      </div>
    </>
  );
}
