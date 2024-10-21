const Progress = () => (
  <div className="absolute top-0 left-0 overflow-hidden w-full h-1 bg-secondary bg-opacity-level-50">
    <div className="relative w-full h-full before:content-[''] before:absolute before:animate-indeterminateFirst before:h-full before:bg-secondary after:content-[''] after:relative after:h-full after:animate-indeterminateSecond after:bg-secondary after:bg-opacity-level-80" />
  </div>
);

export default Progress;
