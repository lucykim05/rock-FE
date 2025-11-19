import { CHANNEL } from "../../constants/messages.js";
import { sendMessage } from "./messageManager.js";
import { formatKSTDate } from "../../utils/time.js";
import { saveStartTime } from "./DBManager.js";

export const checkStudy = (newState, studyChannelId) => {
  const curChannelId = newState.channelId;
  const userDisplayName = newState.member.user.displayName;
  if (curChannelId === studyChannelId) {
    //입장
    startTimer(newState);
    const msg = userDisplayName + CHANNEL.ENTER_MSG;
    sendMessage(newState, msg, studyChannelId);
  } else {
    //퇴장
    endTimer();
    const msg = userDisplayName + CHANNEL.EXIT_MSG;
    sendMessage(newState, msg, studyChannelId);
  }
};

const startTimer = async (newState) => {
  const startTime = new Date();
  const date = formatKSTDate(new Date());
  saveStartTime(newState, startTime, date);
};
