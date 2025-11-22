// 공부시간 순위 카드

import { StatCard } from './StatCard';

export function RankingCard({ ranking }) {
  return (
    <StatCard title="공부시간 순위">
      <ul>
        {ranking.map((item, index) => (
          <li key={index}>
            {index + 1}위 - {item.username} ({item.hours}시간)
          </li>
        ))}
      </ul>
    </StatCard>
  );
}
