import {
  StartTimeDBSaveFailError,
  FetchStartTimeError,
  EndTimeDBSaveFailError,
  FetchStudyTimeError,
} from "../../error/Errors.js";
import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTimeQueries.js";

export const DBsaveStartTime = async (newState, startTime, date) => {
  try {
    await pool.query(STUDY_TIME_QUERIES.SAVE_STUDY_TIME, [
      newState.member.user.id,
      date,
      startTime,
      null,
      null,
      newState.guild.id,
    ]);
  } catch (error) {
    throw new StartTimeDBSaveFailError(error);
  }
};

import { formatKSTDate } from "../../utils/time.js";
const fetchStartTime = async (userId, guildId) => {
  try {
    const fetchedStartTime = await pool.query(
      STUDY_TIME_QUERIES.FETCH_START_TIME,
      [userId, guildId]
    );
    return fetchedStartTime.rows[0].start_time;
  } catch (error) {
    throw new FetchStartTimeError(error);
  }
};

export const DBsaveEndTime = async (newState, endTime, date) => {
  const userId = newState.member.user.id;
  const guildId = newState.guild.id;
  const startTime = await fetchStartTime(userId, guildId);
  const studyTime = Math.floor(
    (endTime.getTime() - startTime.getTime()) / 1000
  );
  try {
    await pool.query(STUDY_TIME_QUERIES.UPDATE_STUDY_TIME, [
      userId,
      date,
      startTime,
      endTime,
      studyTime,
      guildId,
    ]);
  } catch (error) {
    throw new EndTimeDBSaveFailError(error);
  }
};

export const fetchStudyTimeforDM = async (newState) => {
  const userId = newState.member.user.id;
  const guildId = newState.guild.id;
  const date = formatKSTDate(new Date());

  try {
    const recentStudyTime = await pool.query(
      STUDY_TIME_QUERIES.FETCH_RECENT_STUDY_TIME,
      [userId, guildId]
    );
    const dailyStudyTime = await pool.query(
      STUDY_TIME_QUERIES.FETCH_DAILY_STUDY_TIME,
      [userId, guildId, date]
    );
    return [recentStudyTime, dailyStudyTime];
  } catch (error) {
    throw new FetchStudyTimeError(error);
  }
};
