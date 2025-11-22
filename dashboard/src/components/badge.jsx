/**
 * 사용 방법
 * <Badge text = "내용" backgroudColor = "배경색" color = "글자색" />
 */

export default function Badge({ text, color }) {
  return (
    <div
      style={{
        backgroundColor: color || '#000',
        color: '#fff',
        borderRadius: '12px',
        padding: '2px 6px',
        fontSize: '0.7em',
        marginTop: '2px', // 뱃지 간 간격
        display: 'inline-block', // 두 개 붙어도 겹치지 않도록
      }}
    >
      {text}
    </div>
  );
}
