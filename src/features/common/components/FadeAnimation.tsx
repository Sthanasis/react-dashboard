import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

const duration = 250;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  height: '100%',
};

const transitionStyles: { [key: string]: CSSProperties } = {
  entering: { opacity: 1, transform: 'translateY(200%)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 0, transform: 'translateY(0)' },
  exited: { opacity: 0, transform: 'translateY(200%)' },
};
const Fade = ({ children }: { children: ReactNode }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isElementIn, setIsElementIn] = useState(false);

  useEffect(() => {
    setIsElementIn(true);
    return () => setIsElementIn(false);
  }, []);
  return (
    <Transition
      nodeRef={nodeRef}
      in={isElementIn}
      timeout={duration}
      unmountOnExit
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

export default Fade;
