import { useDebounceListCleanup } from '@/features/common/hooks/useDebounceListCleanup';
import { renderHook } from '@testing-library/react';
vi.useFakeTimers();
vi.spyOn(global, 'setTimeout');
describe('useDebounceListCleanup', () => {
  test('creates timeouts as much as count but the callback is called once', async () => {
    const mockFn = vi.fn();
    let countProp = 1;
    const { rerender } = renderHook(() =>
      useDebounceListCleanup(countProp, 500, mockFn)
    );
    countProp++;
    rerender();
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(countProp);
    expect(setTimeout).toHaveBeenCalledWith(mockFn, 500);
    vi.runAllTimers();
    expect(mockFn).toHaveBeenCalledOnce();
  });
});
