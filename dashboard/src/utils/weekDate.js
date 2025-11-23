//new Date()를 인자로 받고 해당 주의 월요일 00:00:00를 반환
export const getWeekStart = (date) => {
  const today = new Date(date);
  let day = today.getDay(); // 0:일요일 - 6:토요일

  const diff = day === 0 ? 6 : day - 1;
  const startDay = new Date(today.setDate(today.getDate() - diff)); //오늘에서 해당 요일의 갯수만 빼면 월요일이 됨

  startDay.setHours(0, 0, 0, 0);

  return startDay;
};

//getWeekStart의 반환값을 인자로 받고 동일한 timestamp형식으로 해당 주의 일요일 반환
export const getWeekEnd = (firstDay) => {
  // firstDay 원본이 바뀌지 않게 복사해서 사용
  const lastDay = new Date(firstDay);

  //오늘 날짜로부터 월요일까지의 날짜 수를 세기 위해 오늘이 일요일이라면 6을 빼주고, 나머지 날짜는 당일만 제외하여 1만 뻼
  lastDay.setDate(lastDay.getDate() + 6);

  //시간을 밤 11시 59분 59초로 설정해야 일요일 밤 데이터까지 다 가져옵니다.
  lastDay.setHours(23, 59, 59, 999);

  return lastDay;
};
