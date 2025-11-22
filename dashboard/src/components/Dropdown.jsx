// dropdown 기본 형태

export default function Dropdown({ options, value, onChange }) {
  return (
    <select
      value={value?.id || ''}
      onChange={(e) => {
        const selected = options.find((opt) => opt.id === e.target.value);
        onChange(selected || null); 
      }}
      className="border rounded-md px-2 py-1 text-sm"
    >
      <option value="">서버 선택</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  );
}
