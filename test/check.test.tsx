import { act, renderHook } from '@testing-library/react';
import { useCheckList } from '../src/hooks/useCheckList';
import mockData from './data';

describe('useCheckList Test', () => {
  it('페이지 진입 시 모든 상품이 선택된 상태여야 한다.', () => {
    const { result } = renderHook(() => useCheckList(mockData, (item) => item.id));

    expect(result.current.isAllChecked).toBe(true);
  });

  it('toggle 호출 시 해당 항목의 체크 상태가 반전되어야 한다.', () => {
    const { result } = renderHook(() => useCheckList(mockData, (item) => item.id));

    expect(result.current.state.get(1)).toBe(true);

    act(() => result.current.toggle(mockData[0].id));
    expect(result.current.state.get(1)).toBe(false);
  });

  it('unCheckAll, checkAll 호출 시 모든 항목의 체크 상태가 반전되어야 한다.', () => {
    const { result } = renderHook(() => useCheckList(mockData, (item) => item.id));

    act(() => result.current.uncheckAll());
    expect(result.current.state.get(1)).toBe(false);
    expect(result.current.state.get(2)).toBe(false);
    expect(result.current.state.get(3)).toBe(false);

    act(() => result.current.checkAll());
    expect(result.current.state.get(1)).toBe(true);
    expect(result.current.state.get(2)).toBe(true);
    expect(result.current.state.get(3)).toBe(true);
  });
});
