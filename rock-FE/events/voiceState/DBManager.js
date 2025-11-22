import {
  StartTimeDBSaveFailError,
  FetchStartTimeError,
  EndTimeDBSaveFailError,
  FetchStudyTimeError,
} from "../../error/Errors.js";
import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTimeQueries.js";
import { formatKSTDate } from "../../utils/time.js";
import { UNIT } from "../../constants/units.js";

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

const fetchStartTimeAndSessionId = async (userId, guildId) => {
  try {
    const fetchedStartTime = await pool.query(
      STUDY_TIME_QUERIES.FETCH_START_TIME_AND_SESSION_ID,
      [userId, guildId]
    );

    const startTime = fetchedStartTime.rows[0]?.start_time;
    const sessionId = fetchedStartTime.rows[0]?.session_id;
    return [startTime, sessionId];
  } catch (error) {
    throw new FetchStartTimeError(error);
  }
};

export const DBsaveEndTime = async (newState, endTime) => {
  const userId = newState.member.user.id;
  const guildId = newState.guild.id;
  const [startTime, sessionId] = await fetchStartTimeAndSessionId(
    userId,
    guildId
  );
  const studyTime = Math.floor(
    (endTime.getTime() - startTime.getTime()) / UNIT.MS2SEC
  );

  try {
    await pool.query(STUDY_TIME_QUERIES.UPDATE_STUDY_TIME, [
      endTime,
      studyTime,
      sessionId,
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
