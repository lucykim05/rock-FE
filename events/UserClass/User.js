import {
  StudyTimeCountError,
  SendingDMFailError,
  SaveStudyTimeToDBFailError,
} from "../../error/Errors.js";
import { formatKSTDate } from "../../utils/time.js";
import { UNIT } from "../../constants/units.js";
import pool from "../../db/database.js";
import { STUDY_TIME_QUERIES } from "../../db/queries/studyTime.js";
import { ERROR_MESSAGES } from "../../constants/errorMessages.js";

export class User {
  #newState;

  #userId;
  #userDisplayName;
  #membersMap;

  #isStudying;
  #studyTimeStart;
  #studyTimeEnd;
  #studyTime;
  #totalStudyTime;
  #date;

  constructor(newState) {
    this.#initializeUser(newState);
  }

  #initializeUser(newState) {
    this.#newState = newState;
    this.#userDisplayName = newState.member.user.displayName;
    this.#userId = newState.member.user.id;
    this.#membersMap = newState.guild.members.cache;
    this.#isStudying = false;
    this.#date = formatKSTDate(new Date());
    this.#studyTimeStart = 0;
    this.#studyTimeEnd = 0;
    this.#studyTime = 0;
    this.#totalStudyTime = 0;
  }

  updateState(newState) {
    this.#newState = newState;
    this.#userDisplayName = newState.member.user.displayName;
    this.#userId = newState.member.user.id;
  }

  get userId() {
    return this.#userId;
  }

  get curState() {
    return this.#newState;
  }

  makeMessage(msg) {
    return this.#userDisplayName + msg;
  }

  startTimer() {
    this.#studyTimeStart = Date.now(); //ms -> sec으로 변환해서 저장
    this.#isStudying = true;
  }

  async endTimer() {
    if (this.#isStudying && this.#studyTimeStart > 0) {
      this.#studyTimeEnd = Date.now(); //ms -> sec으로 변환해서 저장
      this.#isStudying = false;
      await this.#saveStudyTime();
      this.#sendDM();
      return;
    }
    throw new StudyTimeCountError();
  }

  async #saveStudyTime() {
    if (this.#studyTimeStart > 0 && this.#studyTimeEnd > 0) {
      this.#studyTime = this.#calculateStudyTime();
      this.#totalStudyTime += this.#studyTime;
      await this.#saveToDB();
      return;
    }
    throw new StudyTimeCountError();
  }

  async #saveToDB() {
    try {
      const formattedStartTime = new Date(this.#studyTimeStart);
      const formattedEndTime = new Date(this.#studyTimeEnd);
      await pool.query(STUDY_TIME_QUERIES.SAVE_STUDY_TIME, [
        this.#userId,
        this.#date,
        formattedStartTime,
        formattedEndTime,
        this.#totalStudyTime,
      ]);
    } catch (error) {
      throw new SaveStudyTimeToDBFailError(this.#newState, this.#userId, error);
    }
  }

  #sendDM() {
    try {
      const formattedStudyTime = this.#formatStudyTime(this.#studyTime);
      const formattedTotalStudyTime = this.#formatStudyTime(
        this.#totalStudyTime
      );

      const member = this.#membersMap.get(this.#userId);
      member.send(
        `${
          this.#userDisplayName
        } 마님 방금 ${formattedStudyTime} 공부하셨습니다요!\n오늘 총 공부 시간은 ${formattedTotalStudyTime} 여유!!`
      );
    } catch (error) {
      const member = this.#membersMap.get(this.#userId);
      member.send(`${ERROR_MESSAGES.ERROR_STUDY_TIME_DBSAVE_FAIL}`);
      throw new SendingDMFailError(this.#newState, error);
    }
  }

  //초단위로 측정된 시간을 시분초 단위로 변환
  #formatStudyTime = (time) => {
    const hours = Math.floor(time / UNIT.SEC2HOUR);
    const minutes = Math.floor((time % UNIT.SEC2HOUR) / UNIT.SEC2MINUTE);
    const seconds = time % UNIT.SEC2MINUTE;
    return `${hours}시 ${minutes}분 ${seconds}초`;
  };

  #calculateStudyTime() {
    const studyTimeInSec = Math.floor(
      (this.#studyTimeEnd - this.#studyTimeStart) / 1000
    );
    return studyTimeInSec;
  }
}
