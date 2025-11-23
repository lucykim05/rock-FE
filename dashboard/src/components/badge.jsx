/**
 * 사용 방법
 * <Badge text = "내용" backgroudColor = "배경색" color = "글자색" />
 */

export default function Badge({ text, color, backgroundColor }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || '#002480ac',
        color: color || '#fff ',
        borderRadius: '12px',
        padding: '3px 35%',
        fontSize: '0.8em',
        fontWeight:"bold",
        marginTop: '60%',
        display: 'inline-block',
      }}
    >
      {text}
    </div>
  );
}
