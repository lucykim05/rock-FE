// 통계 출력할 카드

export function StatCard({ title, children }) {
  return (
    <div
      style={{
        width: '400px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ marginBottom: '15px' }}>{title}</h2>
      {children}
    </div>
  );
}
