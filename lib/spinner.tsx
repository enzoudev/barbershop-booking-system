interface SpinnerProps {
  size?: string; 
}

export function Spinner({ size = "w-5 h-5" }: SpinnerProps) {
  return (
    <div 
      className={`${size} border-2 border-white border-t-transparent rounded-full animate-spin`} 
      role="status" 
      aria-label="Carregando"
    />
  );
}