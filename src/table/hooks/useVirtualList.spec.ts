import { useVirtualList } from '@/table/hooks/useVirtualList';
import { VirtualListOptions } from '@/table/types/virtualListOptions';
import { act, renderHook } from '@test-utilities';

describe('useVirtuallist', () => {
  beforeEach(() => {
    vitest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  const options: VirtualListOptions = {
    containerHeight: 200,
    itemHeight: 20,
    renderAhead: 10,
    totalItems: 100,
  };
  test('visible nodes count change according to item height', () => {
    let props = options;
    const { result, rerender } = renderHook(() => useVirtualList(props));
    expect(result.current.visibleNodeList).toHaveLength(20);
    props = { ...options, itemHeight: 10 };
    rerender();
    expect(result.current.visibleNodeList).toHaveLength(30);
  });
  test('scrolling over the list', () => {
    const { result } = renderHook(() => useVirtualList(options));
    expect(result.current.visibleNodeList).toHaveLength(20);
    expect(result.current.scrollTop).toBe(0);

    act(() => result.current.handleScroll(50));

    expect(result.current.visibleNodeList).toHaveLength(20);
    expect(result.current.scrollTop).toBe(50);
  });
});
