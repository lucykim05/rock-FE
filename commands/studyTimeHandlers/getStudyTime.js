import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTimeQueries.js";
import { getKoreanTime, formatKSTDate } from "../../utils/time.js";
import { formatStudyTime } from "../../utils/time.js";
import { STUDYTIME } from "../../constants/messages.js";

export const getStudyTime = async (interaction, value) => {
  const userDisplayName = interaction.member.displayName;
  const userId = interaction.user.id;
  const todayDate = formatKSTDate(getKoreanTime()); //yyyy-mm-dd 문자열 형식
  let response = "";

  try {
    if (value === "day") {
      response = await dailyStudyTimeMsg(todayDate, userId, userDisplayName);
    } else if (value === "week") {
      response = await weeklyStudyTimeMsg(todayDate, userId, userDisplayName);
    } else if (value === "month") {
      const monthPattern = `${todayDate.substring(0, 7)}%`;
      response = await monthlyStudyTimeMsg(
        monthPattern,
        userId,
        userDisplayName
      );
    }
  } catch (error) {
    response = STUDYTIME.ERROR_FETCH_DB_DATA;
  } finally {
    await interaction.reply(response);
  }
};

const dailyStudyTimeMsg = async (date, userId, userDisplayName) => {
  const dailyStudyTime = await getStudyTimeFromDB(
    STUDY_TIME_QUERIES.FETCH_DAILY_STUDY_TIME,
    [userId, date]
  );
  const formattedStudyTime = formatStudyTime(dailyStudyTime);
  return `[${userDisplayName}] 마님의 오늘(${date}) 공부시간은 ${formattedStudyTime} 여유!`;
};

const weeklyStudyTimeMsg = async (date, userId, userDisplayName) => {
  const weekStartTimeStamp = getWeekStart(date);
  const weekStartDate = formatKSTDate(weekStartTimeStamp);

  const weekEndTimeStamp = getWeekEnd(weekStartTimeStamp);
  const weekEndDate = formatKSTDate(weekEndTimeStamp);

  const weeklyStudyTime = await getStudyTimeFromDB(
    STUDY_TIME_QUERIES.FETCH_WEEKLY_STUDY_TIME,
    [userId, weekStartDate, weekEndDate]
  );

  const formattedStudyTime = formatStudyTime(weeklyStudyTime);

  return `${userDisplayName} 마님의 이번 주(${weekStartDate} ~ ${weekEndDate})의 공부시간은 ${formattedStudyTime} 여유!`;
};

const monthlyStudyTimeMsg = async (datePattern, userId, userDisplayName) => {
  const monthlyStudyTime = await getStudyTimeFromDB(
    STUDY_TIME_QUERIES.FETCH_MONTHLY_STUDY_TIME,
    [userId, datePattern]
  );
  const formattedStudyTime = formatStudyTime(monthlyStudyTime);

  const dateOnlyMonth = datePattern.substring(5, 7);
  return `[${userDisplayName}] 마님의 ${dateOnlyMonth}월의 공부시간은 ${formattedStudyTime} 여유!`;
};

const getStudyTimeFromDB = async (query, dateArray) => {
  const queryResult = await pool.query(query, dateArray);
  const totalStudyTime = queryResult.rows[0].total_study_time;
  return totalStudyTime;
};

const getWeekStart = (date) => {
  const today = new Date(date); //yyyymmddT~ 형식
  let day = today.getDay(); // 0:일요일 - 6:토요일

  //오늘 날짜로부터 월요일까지의 날짜 수를 세기 위해 오늘이 일요일이라면 6을 빼주고, 나머지 날짜는 당일만 제외하여 1만 뻼
  if (day === 0) day = 6;
  else day -= 1;

  //오늘에서 해당 요일의 갯수만 빼면 월요일이 됨
  const startDay = today.getDate() - day;
  const startDate = new Date(today.setDate(startDay));
  return startDate;
};

const getWeekEnd = (firstDay) => {
  const today = new Date(firstDay);
  let endDate = new Date(today.setDate(firstDay.getDate() + 6)); //월요일 + 6 = 일요일

  return endDate;
};
