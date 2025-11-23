import { getWeekStart, getWeekEnd } from "../utils/weekDate";
import { supabase } from "./supabaseClient";

export const getWeeklyAttendance = async (
  hasFetchedData,
  userId,
  selectedGuild
) => {
  if (hasFetchedData.current) return;
  try {
    hasFetchedData.current = true;

    const weekStartDate = getWeekStart(new Date());
    const weekEndDate = getWeekEnd(weekStartDate);

    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("guild_id", selectedGuild.id)
      .gte("created_at", weekStartDate.toISOString()) // 시작일보다 크거나 같고
      .lte("created_at", weekEndDate.toISOString()); // 종료일보다 작거나 같음

    if (error) throw Error(error.message);
    if (data) return data;
  } catch (error) {
    console.log("db error : ", error);
  }
  return false;
};

export const getAttendanceDate = async (guildId, userId) => {
  try {
    const { data, error } = await supabase
      .from("attendance")
      .select("attendance_date")
      .eq("guild_id", guildId)
      .eq("user_id", userId);

    if (error) throw Error(error);
    if (data) {
      const dates = data.map((row) => {
        const date = new Date(row.attendance_date);
        date.setDate(date.getDate()); // 하루 빼기(시간대 문제)
        return date.toISOString().split("T")[0];
      });

      return dates;
    }
  } catch (error) {
    console.error("출석 데이터 오류", error);
  }
};
