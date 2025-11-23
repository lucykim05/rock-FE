import { motion } from 'framer-motion';
import { StatCard } from './StatCard';

export function StudyRankingCard({ ranking }) {
  return (
    <StatCard title="이번주 공부시간 순위">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ranking.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            style={{
              padding: '12px 15px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '15px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
              <span style={{ fontWeight: 700, minWidth: '30px' }}>
                {index + 1}위
              </span>
              <span>{item.username}</span>
            </div>
            <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
              {item.studyTime}
            </span>
          </motion.div>
        ))}
      </div>
    </StatCard>
  );
}
