/**
 * 유저별 이번주 공부 시간 데이터 가져옴 -> 순위 계산
 * 시간 변환 -> 출력
 */

import { supabase } from './supabaseClient';
import { getWeekStart, getWeekEnd } from '../utils/weekDate.js';

export const getWeeklyStudyRanking = async (selectedGuild) => {
  const weekStart = getWeekStart(new Date()).toISOString();
  const weekEnd = getWeekEnd(getWeekStart(new Date())).toISOString();

  try {
    const { data, error } = await supabase
      .from('session')
      .select(`user_id, user:user_id(username), study_time`)
      .eq('guild_id', selectedGuild.id)
      .gte('start_time', weekStart)
      .lte('end_time', weekEnd);

    if (!data) return [];

    // 유저별 합산
    const totals = {};
    data.forEach((item) => {
      const username = item.user.username;
      if (!totals[username]) totals[username] = 0;
      totals[username] += item.study_time;
    });

    // 배열로 변환
    const ranking = Object.entries(totals)
      .map(([username, totalSeconds]) => ({
        username,
        studyTime: formatStudyTime(totalSeconds), // 시분만 표시
        seconds: totalSeconds, // 정렬은 기존 초단위 사용
      }))
      .sort((a, b) => b.seconds - a.seconds);

    return ranking;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 초 -> 시, 분으로 변환(rock-FE의 time.js 역할)
const formatStudyTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}시간 ${minutes}분`;
};
