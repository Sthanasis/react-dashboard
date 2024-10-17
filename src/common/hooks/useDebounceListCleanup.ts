import { useEffect } from 'react';

export const useDebounceListCleanup = (
  count: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useEffect(() => {
    let bounce: NodeJS.Timeout | number = 0;
    if (count > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(cleanUpFunction, duration);
    }

    return () => clearTimeout(bounce);
  }, [count, duration, cleanUpFunction]);
};
