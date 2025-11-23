/**
 * 사용 방법
 * <Badge text = "내용" backgroudColor = "배경색" color = "글자색" />
 */

export default function Badge({ text, color, backgroundColor }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || '#000',
        color: color || '#fff',
        borderRadius: '12px',
        padding: '2px 6px',
        fontSize: '0.7em',
        marginTop: '2px',
        display: 'inline-block',
      }}
    >
      {text}
    </div>
  );
}
