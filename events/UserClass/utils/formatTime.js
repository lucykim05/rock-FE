import { UNIT } from "../../../constants/units";

//초단위로 측정된 시간을 시분초 단위로 변환
export const formatStudyTime = (time) => {
  const hours = Math.floor(time / UNIT.SEC2HOUR);
  const minutes = Math.floor((time % UNIT.SEC2HOUR) / UNIT.SEC2MINUTE);
  const seconds = time % UNIT.SEC2MINUTE;
  return `${hours}시 ${minutes}분 ${seconds}초`;
};
