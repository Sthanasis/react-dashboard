import { useVirtualList } from '@/features/table/hooks/useVirtualList';
import { VirtualListOptions } from '@/features/table/types/virtualListOptions';
import { renderHook, act } from '@testing-library/react';

describe('useVirtuallist', () => {
  beforeEach(() => {
    vitest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  const options: VirtualListOptions = {
    containerHeight: 200,
    itemHeight: 10,
    renderAhead: 10,
    totalItems: 100,
  };
  test('visible nodes count change according to item height', () => {
    let props = options;
    const { result, rerender } = renderHook(() => useVirtualList(props));
    expect(result.current.visibleNodeList).toHaveLength(30);
    props = { ...options, itemHeight: 10 };
    rerender();
    expect(result.current.visibleNodeList).toHaveLength(30);
  });
  test('scrolling over the list', () => {
    const { result } = renderHook(() => useVirtualList(options));
    expect(result.current.visibleNodeList).toHaveLength(30);
    expect(result.current.offsetY).toBe(0);

    act(() => result.current.handleScroll(100));

    expect(result.current.visibleNodeList).toHaveLength(30);
    expect(result.current.offsetY).toBe(50);
    expect(result.current.start).toBe(5);
  });
});
