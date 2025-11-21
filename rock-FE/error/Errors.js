import { BotError } from "./BotError.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export class StudyTimeCountError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_STUDY_TIME_CONUT, cause);
  }
}

export class SendingDMFailError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL, cause);
  }
}

export class SendingChannelMessageFailError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_SENDING_MESSAGE_FAIL, cause);
  }
}

export class GetStudyTimeError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_NO_STUDY_TIME, cause);
  }
}

export class StartTimeDBSaveFailError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_START_TIME_DBSAVE_FAIL, cause);
  }
}

export class FetchStartTimeError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_FETCH_START_TIME, cause);
  }
}
export class EndTimeDBSaveFailError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_END_TIME_DBSAVE_FAIL, cause);
  }
}
export class FetchStudyTimeError extends BotError {
  constructor(cause) {
    super(ERROR_MESSAGES.ERROR_FETCH_STUDY_TIME, cause);
  }
}
