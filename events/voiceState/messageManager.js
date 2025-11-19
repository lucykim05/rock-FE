import { SendingChannelMessageFailError } from "../../error/Errors.js";

export const sendMessage = (newState, msg, studyChannelId) => {
  try {
    const channelCollection = newState.guild.channels.cache; //서버에 존재하는 모든 채널을 Collection 형태로 리턴
    //Collection을 순회하여 동일한 voice Channel id를 가진 객체를 찾은 뒤, 해당 객체.send('메세지') 해야 함
    const voiceChannel = channelCollection.get(studyChannelId);
    voiceChannel.send(msg);
  } catch (error) {
    throw new SendingChannelMessageFailError(newState, error);
  }
};
