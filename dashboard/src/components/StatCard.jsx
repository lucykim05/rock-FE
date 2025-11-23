/**
 * 순위 카드들의 레이아웃
 * 공부랭킹, 출석랭킹에 사용
 */

export function StatCard({ title, children }) {
  return (
    <div
      style={{
        width: '400px',
        padding: '24px',
        borderRadius: '14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
      }}
    >
      <h2
        style={{
          marginBottom: '20px',
          fontSize: '22px',
          fontWeight: '700',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '10px',
        }}
      >
        {title}
        <span
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '3px',
            borderRadius: '2px',
            backgroundColor: '#d9d9d9',
          }}
        ></span>
      </h2>
      {children}
    </div>
  );
}
