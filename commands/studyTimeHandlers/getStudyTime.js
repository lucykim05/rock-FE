import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTimeQueries.js";
import { getKoreanTime, formatKSTDate } from "../../utils/time.js";
import { formatStudyTime } from "../../utils/time.js";

export const getStudyTime = async (interaction, range) => {
  const todayDate = formatKSTDate(getKoreanTime());
  const userDisplayName = interaction.member.displayName;

  try {
    if (range === "day") {
      const dailyStudyTime = await getStudyTimeFromDB(
        STUDY_TIME_QUERIES.FETCH_DAILY_STUDY_TIME,
        todayDate
      );
      const formattedStudyTime = formatStudyTime(dailyStudyTime);
      const msg = `[${userDisplayName}] 마님의 오늘(${todayDate}) 공부시간은 ${formattedStudyTime} 여유!`;
      await interaction.reply(msg);
    } else if (range === "month") {
      const monthPattern = `${todayDate.substring(0, 7)}%`;
      const dateOnlyMonth = monthPattern.substring(5, 7);

      const monthlyStudyTime = await getStudyTimeFromDB(
        STUDY_TIME_QUERIES.FETCH_MONTHLY_STUDY_TIME,
        monthPattern
      );
      const formattedStudyTime = formatStudyTime(monthlyStudyTime);
      const msg = `[${userDisplayName}] 마님의 이번 달(${dateOnlyMonth}) 공부시간은 ${formattedStudyTime} 여유!`;
      await interaction.reply(msg);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getStudyTimeFromDB = async (query, date) => {
  const queryResult = await pool.query(query, [date]);
  console.log(queryResult);
  const totalStudyTime = queryResult.rows[0].total_study_time;

  return totalStudyTime;
};
