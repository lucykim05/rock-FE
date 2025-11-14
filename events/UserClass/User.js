import { StudyTimeCountError, SendingDMFailError } from "../../error/Errors.js";
import { saveStudyTimeToDB } from "./utils/saveStudyTimeToDB.js";
import { UNIT } from "../../constants/units.js";
import { formatStudyTime } from "./utils/formatTime.js";

export class User {
  #newState;

  #userId;
  #userDisplayName;

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
    this.#isStudying = false;
    this.#date = this.#getDate();
    this.#studyTimeStart = 0;
    this.#studyTimeEnd = 0;
    this.#studyTime = 0;
    this.#totalStudyTime = 0;
  }
  #getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const date = today.getDate();
    return `${year}-${month}-${date}`;
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
    this.#studyTimeStart = Math.floor(Date.now() / UNIT.MS2SEC); //ms -> sec으로 변환해서 저장
    this.#isStudying = true;
  }

  endTimer() {
    if (this.#isStudying && this.#studyTimeStart > 0) {
      this.#studyTimeEnd = Math.floor(Date.now() / UNIT.MS2SEC); //ms -> sec으로 변환해서 저장
      this.#isStudying = false;
      this.#saveToDB();
      this.#sendDM();
      return;
    }
    throw new StudyTimeCountError();
  }

  #saveToDB() {
    if (this.#studyTimeStart > 0 && this.#studyTimeEnd > 0) {
      this.#studyTime = this.#calculateStudyTime();
      this.#totalStudyTime += this.#studyTime;
      const startTime = new Date(this.#studyTimeStart);
      const endTime = new Date(this.#studyTimeEnd);
      saveStudyTimeToDB(
        this.#userId,
        this.#date,
        startTime,
        endTime,
        this.#totalStudyTime
      );
      return;
    }
    throw new StudyTimeCountError();
  }

  #sendDM() {
    try {
      const formattedStudyTime = formatStudyTime(this.#studyTime);
      const formattedTotalStudyTime = formatStudyTime(this.#totalStudyTime);

      const membersMap = this.#newState.guild.members.cache;
      const member = membersMap.get(this.#userId);
      member.send(
        `${
          this.#userDisplayName
        } 마님 방금 ${formattedStudyTime} 공부하셨습니다요!\n오늘 총 공부 시간은 ${formattedTotalStudyTime} 여유!!`
      );
    } catch (error) {
      new SendingDMFailError(this.#newState, error);
    }
  }

  #calculateStudyTime() {
    return this.#studyTimeEnd - this.#studyTimeStart;
  }
}
