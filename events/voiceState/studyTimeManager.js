import { CHANNEL } from "../../constants/messages.js";
import { sendMessage2Channel, sendDMOfStudyTime } from "./messageManager.js";
import { formatKSTDate } from "../../utils/time.js";
import { DBsaveStartTime, DBsaveEndTime } from "./DBManager.js";
import { StudyTimeCountError } from "../../error/Errors.js";

export const checkStudy = async (newState, studyChannelId) => {
  const curChannelId = newState.channelId;
  const userDisplayName = newState.member.user.displayName;

  try {
    if (curChannelId === studyChannelId) {
      //입장
      await startTimer(newState);
      const msg = userDisplayName + CHANNEL.ENTER_MSG;
      sendMessage2Channel(newState, msg, studyChannelId);
    } else {
      //퇴장
      await endTimer(newState);
      const msg = userDisplayName + CHANNEL.EXIT_MSG;
      sendMessage2Channel(newState, msg, studyChannelId);
      await sendDMOfStudyTime(newState);
    }
  } catch (error) {
    //공부시간 측정 에러가 아닌 메세지 전송 실패 에러는 그냥 위로 올려보내주기!!
    if (error.name.includes("Sending")) {
      throw error;
    }
    throw new StudyTimeCountError(error);
  }
};

const startTimer = async (newState) => {
  const startTime = new Date();
  const date = formatKSTDate(new Date());
  await DBsaveStartTime(newState, startTime, date);
};

const endTimer = async (newState) => {
  const endTime = new Date();
  await DBsaveEndTime(newState, endTime);
};
