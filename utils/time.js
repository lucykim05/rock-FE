//한국 시간(KST) 변환

export function getKoreanTime() {
  const now = new Date();
  const koreaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  return koreaTime;
}

// 형식에 맞춰서

export function formatKSTDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatKSTTime(date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${hour}:${minute}:${second}`;
}

export function getYesterdayKST() {
  const koreanTime = getKoreanTime();
  const yesterday = new Date(koreanTime);
  yesterday.setDate(yesterday.getDate() - 1);
  return formatKSTDate(yesterday);
}

export function isMorningTime() {
  const koreaTime = getKoreanTime();
  const hour = koreaTime.getHours();
  return hour >= 6 && hour < 9;
  //boolean으로
}

//초단위로 측정된 시간을 시분초 단위로 변환
import { UNIT } from "../constants/units.js";
export const formatStudyTime = (time) => {
  const hours = Math.floor(time / UNIT.SEC2HOUR);
  const minutes = Math.floor((time % UNIT.SEC2HOUR) / UNIT.SEC2MINUTE);
  const seconds = time % UNIT.SEC2MINUTE;
  return `${hours}시간 ${minutes}분 ${seconds}초`;
};
