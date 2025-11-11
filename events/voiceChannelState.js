import { Events } from "discord.js";
import { CHANNEL_ENTER_MSG, CHANNEL_EXIT_MSG } from "../constants/messages.js";
import { User } from "./UserClass/User.js";

const studyChannelId = process.env.STUDY_TRACK_VOICE_CHANNEL_ID;
const userInfo = {
  userDisplayName: "",
  userId: "",
  curState: null,
  prevChannelId: "",
  curChannelId: "",
};

export default {
  name: Events.VoiceStateUpdate,
  //client는 voiceStateUpdate를 일으킨 member의 VoiceState를 반환
  execute(oldState, newState) {
    const client = oldState.client;
    setUserInfo(oldState, newState, client); //client에 state에 따른 현재 사용자의 정보를 저장
    checkStudy(client); //현재 사용자의 입/퇴장 상태에 따라 공부시간 측정/종료
  },
};

const setUserInfo = (oldState, newState, client) => {
  if (client.studyUsers === undefined) client.studyUsers = new Map();
  userInfo.userDisplayName = newState.member.user.displayName; //사용자 별명
  userInfo.userId = newState.member.user.id; //사용자 id 번호
  userInfo.curState = newState;
  userInfo.prevChannelId = oldState.channelId;
  userInfo.curChannelId = newState.channelId;
  // newState.member.user.username = 사용자 이름 (=id)
};

const sendMessage = (msg) => {
  const channelCollection = userInfo.curState.guild.channels.cache; //서버에 존재하는 모든 채널을 Collection 형태로 리턴
  //Collection을 순회하여 동일한 voice Channel id를 가진 객체를 찾은 뒤, 해당 객체.send('메세지') 해야 함
  for (const channel of channelCollection) {
    const channelId = channel[0];
    if (channelId === studyChannelId) {
      const voiceChannelObject = channel[1];
      voiceChannelObject.send(msg);
    }
  }
};

const checkStudy = (client) => {
  const studyUsersMap = client.studyUsers;
  //만약 client의 studyUsersMap에 해당 사용자의 인스턴스가 저장되어 있지 않다면, 새로 만들어서 추가하고
  //만약 저장이 되어 있다면 해당 value를 꺼내와서 할당
  const user = studyUsersMap.has(userInfo.userId)
    ? studyUsersMap.get(userInfo.userId)
    : new User(userInfo);

  //현재 State의 입/퇴장 구분
  if (userInfo.curChannelId === studyChannelId) {
    //입장 시간 저장
    user.startTimer();
    //입장 메세지 전송
    sendMessage(userInfo.userDisplayName + CHANNEL_ENTER_MSG);
  }
  if (userInfo.curChannelId !== studyChannelId) {
    user.endTimer();
    //퇴장 메세지 전송
    sendMessage(userInfo.userDisplayName + CHANNEL_EXIT_MSG);

    user.saveTime();
    user.sendDM(userInfo.curState);
  }
  studyUsersMap.set(userInfo.userId, user);
};
