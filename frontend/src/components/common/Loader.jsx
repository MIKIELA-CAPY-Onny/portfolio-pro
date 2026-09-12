const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

const Loader = ({ size = 'md', text, color = 'primary', fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          ${sizes[size]} rounded-full animate-spin
        `}
        style={{
          borderColor: color === 'white'
            ? 'rgba(255,255,255,0.2)'
            : 'var(--border-color)',
          borderTopColor: color === 'white'
            ? '#ffffff'
            : 'var(--color-primary)',
        }}
      />
      {text && (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;