import { StatCard } from './StatCard';
import { motion } from 'framer-motion';

export function AttendanceRankingCard({ ranking }) {
  return (
    <StatCard title="연속 출석 순위">
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
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '15px',
            }}
          >
            <span>{index + 1}위</span>
            <span>{item.username}</span>
            <span>{item.days}일</span>
          </motion.div>
        ))}
      </div>
    </StatCard>
  );
}
