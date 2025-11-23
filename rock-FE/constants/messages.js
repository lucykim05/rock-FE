export const CHANNEL = Object.freeze({
  ENTER_MSG: " 마님 오셨습니까요!!!",
  EXIT_MSG: " 마님 들어가십쇼!!!",
});

export const ATTENDANCE = Object.freeze({
  MORNING_ATTEND: "아침 출석에 성공했습니다요!🎉",
  ALREADY_CHECKED: "마님, 오늘 건 이미 찍었슈!",
  ERROR_ATTEND: "이런, 뭔가 꼬였는갑네… 출석이 안 됐습니다요!",
  ERROR_ATTENDSTATS: "이런, 뭔가 꼬였는갑네… 통계를 못 불러오겠는디요?",
  NO_RECORD: "출석 기록이 없습니다요!",
  NO_RANKING: "순위 데이터가 없습니다요!",
  NO_CHANNEL: "채널이 없는 것 같습니다요! 확인해 보셔야겠어유!",
  BUTTON_MESSAGE: "출석하실 시간이여유 마님!!",
  CHECK_CHANNEL_ID: "해당 명령어는 출석 채널에서 사용해주셔야 합니다요!",
});

export const STUDYTIME = Object.freeze({
  ERROR_FETCH_DB_DATA:
    "이런, 뭔가 꼬였는갑네... 공부 시간을 못 불러오겠는디요?",
});

const KEYWORDS = Object.freeze({
  BOX: "```",

  HELLO: "`/인사`",
  HUMOR: "`/오늘의유머`",
  DASHBOARD: "`/대시보드`",
  BOJ: "`/백준문제추천`",

  ATTENDANCE_CHECK: "`/출석체크`",
  ATTENDANCE_STATE: "`/출석현황`",
  ATTENDANCE_STAT: "`/출석통계`",

  STUDY: "`공부`",
  STUDYTIME: "`/공부시간`",

  SETTING: "`/세팅`",
  HELP: "`/도움말`",
});

export const HELP_MESSAGE = `
### 안녕하셔유 마님 지는 돌쇠예유! 마님의 공부를 위해 제 사용법을 알려드립지요.


## 기본
- ${KEYWORDS.HELLO} : 지가 인사를 해드려유!
- ${KEYWORDS.HUMOR} : 개발자 마님을 위해 지가 고오급 유머를 던져드려유 흐흐...
- ${KEYWORDS.BOJ} : 유우명한 온라인 알고리즘 문제 사이트 '백준'에서 지가 문제를 아무거나 뽑아드려유!\n난이도 / 태그 / 언어를 선택적으로 설정하실 수 있으셔유! 
- ${KEYWORDS.DASHBOARD} : 지가 있는 서버에서 마님의 공부시간과 출석 정보를 한 번에 모아서 볼 수 있는 웹사이트를 안내 해드려유!\n물론 마님께서는 부지런하셔서 안 보셔두 꽉 차있겠지만유.. 

## 출석
### 출석 설정 명령어

- ${KEYWORDS.SETTING} 출석채널설정 : 출석체크를 할 채널을 정할 수 있는 명령어예유.\n**출석 채널을 정하기 않으면 출석을 기록하지 못해유!** \n
- ${KEYWORDS.SETTING} 출석시간설정 : 출석체크 알람을 설정하는 명령어여유!\n시간을 설정해주시면 지가 달려와서 마님께 알려드려유.

### 출석 체크 명령어
- ${KEYWORDS.ATTENDANCE_CHECK} : 출석 채널에서 출석 체크를 할 수 있어유.\n하루에 한 번만 사용할 수 있고 **출석 채널이 아닌 곳에서 하면 작동하지 않아유!** \n
- ${KEYWORDS.ATTENDANCE_STATE} : 총 출석 횟수와 연속으로 몇 번이나 출석했는지, 그리고 이번 달 출석률을 확인 할 수 있어유. \n
- ${KEYWORDS.ATTENDANCE_STAT} : 모든 멤버들의 출석 순위를 확인할 수 있어유.\n출석 1등 마님은 제가 특별히 모시것슈!!\n


## 공부
### 스터디 채널 설정 명령어 
- ${KEYWORDS.SETTING} 공부채널설정 : 공부시간을 측정할 음성 채널을 설정할 수 있슈!\n설정한 음성채널에 마님께서 입장하고 퇴장하는 시간을 기준으로 저 돌쇠가 마님의 공부한 시간을 저장하고 있습니다요!!\n**음성채널을 설정해야 지가 마님의 공부시간 저장할 수 있으니 꼭 해주십죠!!**\n
- ${KEYWORDS.STUDYTIME} : 마님의 공부시간 통계를 볼 수 있어유!\n하루 / 일주일 / 한 달 간의 총 공부시간을 확인할 수 있습죠!!


---

이상이여유 마님! 
추가적인 기능 개발을 원하시면 [개발자 김희주 마님](https://github.com/lucykim05)이나 [개발자 이여빈 마님](https://github.com/stellalee1210)께 말씀해보셔유!


해당 도움말은 ${KEYWORDS.HELP} 명령어로 다시 확인 하실 수 있습니다요!

돌쇠는 이만 물러갑니다요. 
오늘도 공부 즐겁게 하시어유!! 
`;
