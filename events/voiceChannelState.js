import { Events } from "discord.js";
import { StudyTimeCountError } from "../error/Errors.js";
import { checkStudy } from "./voiceState/studyTimeManager.js";
import { STUDY_TIME_QUERIES } from "../db/queries/studyTimeQueries.js";
import pool from "../db/database.js";

export default {
  name: Events.VoiceStateUpdate,
  //client는 voiceStateUpdate를 일으킨 member의 VoiceState를 반환
  async execute(oldState, newState) {
    const studyChannelId = await fetchStudyChannelId(newState.guild.id); //DB에 저장된 현재 guild의 id를 가져옴

    try {
      //스터디를 진행하는 음성채널에 변동이 있는 경우 (= 입/퇴장)
      if (
        oldState.channelId === studyChannelId ||
        newState.channelId === studyChannelId
      ) {
        checkStudy(newState, studyChannelId); //현재 사용자의 입/퇴장 상태에 따라 공부시간 측정/종료
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

const fetchStudyChannelId = async (guildId) => {
  const queryResult = pool.query(STUDY_TIME_QUERIES.FETCH_STUDY_CHANNEL_ID, [
    guildId.toString(),
  ]);
  return (await queryResult).rows[0].study_channel_id;
};
