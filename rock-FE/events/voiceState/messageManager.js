import {
  SendingChannelMessageFailError,
  SendingDMFailError,
} from "../../error/Errors.js";
import { fetchStudyTimeforDM } from "./DBManager.js";
import { formatStudyTime } from "../../utils/time.js";

export const sendMessage2Channel = (newState, msg, studyChannelId) => {
  try {
    const channelCollection = newState.guild.channels.cache; //서버에 존재하는 모든 채널을 Collection 형태로 리턴
    //Collection을 순회하여 동일한 voice Channel id를 가진 객체를 찾은 뒤, 해당 객체.send('메세지') 해야 함
    const voiceChannel = channelCollection.get(studyChannelId);
    voiceChannel.send(msg);
  } catch (error) {
    throw new SendingChannelMessageFailError(error);
  }
};
export const sendDMOfStudyTime = async (newState) => {
  const userId = newState.member.user.id;
  const userDisplayName = newState.member.user.displayName;

  const [studyTime, totalStudyTime] = await fetchStudyTimeforDM(newState);
  const formattedStudyTime = formatStudyTime(studyTime.rows[0].study_time);
  const formattedTotalStudyTime = formatStudyTime(
    totalStudyTime.rows[0].total_study_time
  );
  try {
    const member = newState.guild.members.cache.get(userId);
    await member.send(
      "```" +
        `${userDisplayName} 마님 방금 ${formattedStudyTime} 공부하셨습니다요!\n오늘 총 공부 시간은 ${formattedTotalStudyTime} 여유!!` +
        "```"
    );
  } catch (error) {
    throw new SendingDMFailError(error);
  }
};
