export const calculateDailyStudyTime = (sessions) => {
  return sessions.reduce((acc, session) => {
    const date = session.study_date;
    const time = session.study_time;

    // 해당 날짜 키가 없으면 0으로 초기화 후 덧셈
    acc[date] = (acc[date] || 0) + time;
    return acc;
  }, {});
};
