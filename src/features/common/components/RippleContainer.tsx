import { useState, MouseEvent } from 'react';
import { useDebounceListCleanup } from '../hooks/useDebounceListCleanup';

interface RippleProps {
  disabled?: boolean;
}

const RippleContainer = ({ disabled = false }: RippleProps) => {
  const ANIMATION_DURATION = 600;
  const [rippleList, setRippleList] = useState<
    { x: number; y: number; size: number }[]
  >([]);

  useDebounceListCleanup(rippleList.length, ANIMATION_DURATION, () => {
    setRippleList([]);
  });

  const addRipple = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    const container = event.currentTarget.getBoundingClientRect();
    const size = Math.max(container.width, container.height);
    const x = event.pageX - container.x - size / 2;
    const y = event.pageY - container.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };
    setRippleList([...rippleList, newRipple]);
  };

  return (
    <div
      className="top-0 right-0 bottom-0 left-0 absolute overflow-hidden"
      onMouseDown={addRipple}
    >
      {rippleList.length > 0 &&
        rippleList.map((ripple, index) => {
          return (
            <span
              className="scale-0 rounded-full overflow-hidden absolute opacity-75 bg-white animate-ripple"
              key={`ripple-${index}`}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                animationDuration: `${ANIMATION_DURATION}ms`,
              }}
            />
          );
        })}
    </div>
  );
};

export default RippleContainer;
