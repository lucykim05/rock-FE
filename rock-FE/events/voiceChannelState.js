import { Events } from "discord.js";
import { StudyTimeCountError } from "../error/Errors.js";
import { checkStudy } from "./voiceState/studyTimeManager.js";
import { STUDY_TIME_QUERIES } from "../db/queries/studyTimeQueries.js";
import { sendMessage2Channel } from "./voiceState/messageManager.js";
import pool from "../db/database.js";

export default {
  name: Events.VoiceStateUpdate,
  //client는 voiceStateUpdate를 일으킨 member의 VoiceState를 반환

  async execute(oldState, newState) {
    const studyChannelId = await fetchStudyChannelId(newState.guild.id); //DB에 저장된 현재 guild의 스터디채널 id를 가져옴
    try {
      //스터디 채널이 활성화 되어 있지 않다면 패스
      if (studyChannelId === 0) return;
      //스터디를 진행하는 음성채널에 변동이 있는 경우 (= 입/퇴장)
      const isTargetChannel =
        oldState.channelId === studyChannelId ||
        newState.channelId === studyChannelId;

      if (isTargetChannel) await checkStudy(newState, studyChannelId); //현재 사용자의 입/퇴장 상태에 따라 공부시간 측정/종료
    } catch (error) {
      if (error instanceof StudyTimeCountError) {
        console.log(`[Study Time Count Error] ${error.message}`);
        sendMessage2Channel(
          newState,
          `${newState.member.user.displayName} 마님..\n${error.message} \n다시 한 번 나갔다 들어오셔유...`,
          studyChannelId
        );
      } else {
        console.log(`[system error] ${error.message}`);
      }
    }
  },
};

const fetchStudyChannelId = async (guildId) => {
  const queryResult = await pool.query(
    STUDY_TIME_QUERIES.FETCH_STUDY_CHANNEL_ID,
    [guildId.toString()]
  );
  return queryResult.rows[0]?.study_channel_id ?? 0;
};
