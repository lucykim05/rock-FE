import { BotError } from "./BotError.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export class StudyTimeCountError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_CONUT);
  }
}

export class SendingDMFailError extends BotError {
  constructor(state) {
    console.log(
      `[${state.member.user.displayName}] 사용자에게 ${ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL}`
    );
  }
}

export class SendingChannelMessageFailError extends BotError {
  constructor(state) {
    console.log(
      `[${state.channelId}] 채널에 ${ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL}`
    );
  }
}
