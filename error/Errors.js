import { BotError } from "./BotError.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export class StudyTimeCountError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_CONUT);
  }
}

export class SendingDMFailError extends BotError {
  constructor(state, error) {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL);
    console.log(
      `[${state.member.user.displayName}] 사용자에게 ${ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL}\n${error.message}`
    );
  }
}

export class SendingChannelMessageFailError extends BotError {
  constructor(state, error) {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL);
    console.log(
      `[${state.channelId}] 채널에 ${ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL}\n${error.message}`
    );
  }
}

export class SaveStudyTimeToDBFailError extends BotError {
  constructor(error) {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_DBSAVE_FAIL);
    console.log(`DB에 공부시간 저장 실패\n${error.message}`);
  }
}
