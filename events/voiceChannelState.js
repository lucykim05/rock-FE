import { Events } from "discord.js";

export default {
  name: Events.VoiceStateUpdate,
  //client는 voiceStateUpdate를 일으킨 member의 VoiceState를 반환
  execute(oldState, newState) {
    const userDisplayName = newState.member.user.displayName; //사용자 별명
    if (newState.channelId === null)
      console.log(`${userDisplayName}님께서 퇴장하셨습니다!`);
    else if (oldState.channelId !== newState.channelId)
      console.log(`${userDisplayName}님께서 음성채널에 입장하셨습니다!`);
    //newState.member.user.username = 사용자 이름 (=id)
    //newState.member.user.id = 사용자 id 번호
  },
};
