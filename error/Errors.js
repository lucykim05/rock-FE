import { BotError } from "./BotError.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export class StudyTimeCountError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_CONUT);
  }
}

export class SendingDMFailError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL);
  }
}

export class SendingChannelMessageFailError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL);
  }
}

export class SaveStudyTimeToDBFailError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_DBSAVE_FAIL);
  }
}

export class GetStudyTimeError extends BotError {
  constructor() {
    super(ERROR_MESSAGES.ERROR_NO_STUDY_TIME);
  }
}
