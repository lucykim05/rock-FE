import { Events } from "discord.js";
import { User } from "./studyTimeClasses/User.js";
import {
  StudyTimeCountError,
  SendingChannelMessageFailError,
} from "../error/Errors.js";
import { CHANNEL } from "../constants/messages.js";

const studyChannelId = process.env.STUDY_TRACK_VOICE_CHANNEL_ID;

export default {
  name: Events.VoiceStateUpdate,
  //client는 voiceStateUpdate를 일으킨 member의 VoiceState를 반환
  execute(oldState, newState) {
    try {
      //스터디를 진행하는 음성채널에 변동이 있는 경우 (= 입/퇴장)
      if (
        oldState.channelId === studyChannelId ||
        newState.channelId === studyChannelId
      ) {
        const client = newState.client;
        const user = getStudyUser(newState, client);
        checkStudy(client, user); //현재 사용자의 입/퇴장 상태에 따라 공부시간 측정/종료
      }
    } catch (error) {
      if (error instanceof StudyTimeCountError) {
        sendMessage(
          newState,
          `${newState.member.user.displayName} 마님..\n${error.message} \n다시 한 번 나갔다 들어오셔유...`
        );
        return;
      }

      sendMessage(
        newState,
        `${newState.member.user.displayName} 마님.. 문제가 생긴 것 같슈.\n다시 해보셔야 쓰것는디?`
      );
    }
  },
};

const getStudyUser = (newState, client) => {
  if (!client.studyUsers) client.studyUsers = new Map(); //만약 client에 studyUsers라는 저장소가 없다면 만들어주기
  //만약 client의 studyUsersMap에 해당 사용자의 인스턴스가 저장되어 있지 않다면, 새로 만들어서 추가하고
  //만약 저장이 되어 있다면 해당 value를 꺼내와서 할당
  const studyUsersMap = client.studyUsers;
  const userId = newState.member.user.id;
  if (studyUsersMap.has(userId)) {
    const user = studyUsersMap.get(userId);
    user.updateState(newState);
    return user;
  }
  return new User(newState);
};

const checkStudy = (client, user) => {
  const curChannelId = user.curState.channelId;
  const curState = user.curState;
  if (curChannelId === studyChannelId) {
    //입장
    user.startTimer();
    const msg = user.makeMessage(CHANNEL.ENTER_MSG);
    sendMessage(curState, msg);
  } else {
    //퇴장
    user.endTimer();
    const msg = user.makeMessage(CHANNEL.EXIT_MSG);
    sendMessage(curState, msg);
  }
  client.studyUsers.set(user.userId, user); //client에 해당 사용자의 상태 업데이트
};

const sendMessage = (curState, msg) => {
  try {
    const channelCollection = curState.guild.channels.cache; //서버에 존재하는 모든 채널을 Collection 형태로 리턴
    //Collection을 순회하여 동일한 voice Channel id를 가진 객체를 찾은 뒤, 해당 객체.send('메세지') 해야 함
    const voiceChannel = channelCollection.get(studyChannelId);
    voiceChannel.send(msg);
  } catch (error) {
    throw new SendingChannelMessageFailError(curState, error);
  }
};
