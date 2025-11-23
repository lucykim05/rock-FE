/**
 * 사용방법
 * <Button onClick = {()=> 로직}>
 * 버튼 이름
 * </Button>
 */

export function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm md:px-6 md:py-2 md:text-base border-2 border-gray-700 text-white rounded-lg hover:bg-gray-700 hover:text-white transition-colors font-medium ${className}`}
    >
      {children}
    </button>
  );
}
