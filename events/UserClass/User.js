export class User {
  #userId;
  #userDisplayName;
  #isStudying;
  #yymmdd;
  #studyTimeStart;
  #studyTimeEnd;
  #studyTime;
  #totalStudyTime;
  constructor(data) {
    this.#userDisplayName = data.userDisplayName;
    this.#userId = data.userId;
    this.#isStudying = true;
    this.#yymmdd = this.#getDate();
    this.#studyTimeStart = 0;
    this.#studyTimeEnd = 0;
    this.#studyTime = 0;
    this.#totalStudyTime = 0;
  }

  #getDate() {
    const today = new Date();
    const year = today.getFullYear() % 100;
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const date = today.getDate();
    return `${year}${month}${date}`;
  }

  startTimer() {
    this.#studyTimeStart = new Date().getTime();
  }

  endTimer() {
    this.#studyTimeEnd = new Date().getTime();
  }

  saveTime() {
    this.#studyTime = this.#calculateStudyTime();
    this.#totalStudyTime += this.#studyTime;
  }

  sendDM(state) {
    const membersMap = state.guild.members.cache;
    const member = membersMap.get(this.#userId);
    member.send(
      `${this.#userDisplayName} 마님 방금 ${
        this.#studyTime
      }초 공부하셨습니다요!\n오늘 총 공부 시간은 ${
        this.#totalStudyTime
      }초 여유!!`
    );
  }

  #calculateStudyTime() {
    const studiedSeconds = Math.floor(
      (this.#studyTimeEnd - this.#studyTimeStart) / 1000
    );
    return studiedSeconds;
  }
}
