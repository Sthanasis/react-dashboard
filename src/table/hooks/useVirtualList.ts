import { useMemo, useState } from 'react';
import { VirtualListOptions } from '@/table/types/virtualListOptions';

export const useVirtualList = (options: VirtualListOptions) => {
  const { itemHeight, containerHeight, renderAhead, totalItems } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const start = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - renderAhead / 2),
    [scrollTop, itemHeight, renderAhead]
  );

  const visibleNodeList = useMemo(() => {
    const count = Math.min(
      totalItems - start,
      Math.ceil(containerHeight / itemHeight) + renderAhead
    );

    return new Array(Math.max(count, 0)).fill(null);
  }, [start, totalItems, containerHeight, itemHeight]);

  const handleScroll = (scrollTop: number) => {
    requestAnimationFrame(() => {
      setScrollTop(scrollTop);
    });
  };

  const offsetY = useMemo(() => start * itemHeight, [start, itemHeight]);
  return { visibleNodeList, offsetY, start, handleScroll };
};
