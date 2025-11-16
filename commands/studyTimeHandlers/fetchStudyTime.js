import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTime.js";
import { getKoreanTime, formatKSTDate } from "../../utils/time.js";
import { formatStudyTime } from "../../utils/time.js";

export const fetchStudyTime = async (interaction, range) => {
  const todayDate = formatKSTDate(getKoreanTime());
  const userDisplayName = interaction.member.displayName;

  try {
    if (range === "day") {
      const dailyStudyTime = await getStudyTimeFromDB(
        STUDY_TIME_QUERIES.FETCH_DAY_STUDY_TIME,
        todayDate
      );
      const formattedStudyTime = formatStudyTime(dailyStudyTime);
      const msg = `[${userDisplayName}] 마님의 오늘(${todayDate}) 공부시간은 ${formattedStudyTime} 여유! `;
      await interaction.reply(msg);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getStudyTimeFromDB = async (query, todayDate) => {
  const queryResult = await pool.query(query, [todayDate]);
  const totalStudyTime = queryResult.rows[0].total_study_time;

  return totalStudyTime;
};
