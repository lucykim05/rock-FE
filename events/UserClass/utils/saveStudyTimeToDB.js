import pool from "../../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../../db/queries/studyTime.js";

export const saveStudyTimeToDB = async (
  user_id,
  study_date,
  start_time,
  end_time,
  total_study_time
) => {
  await pool.query(STUDY_TIME_QUERIES.SAVE_STUDY_TIME, [
    user_id,
    study_date,
    start_time,
    end_time,
    total_study_time,
  ]);
};
