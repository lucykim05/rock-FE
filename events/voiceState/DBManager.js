import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTimeQueries.js";

export const saveStartTime = async (newState, startTime, date) => {
  await pool.query(STUDY_TIME_QUERIES.SAVE_STUDY_TIME, [
    newState.member.user.id,
    date,
    startTime,
    null,
    null,
    newState.guild.id,
  ]);
};
