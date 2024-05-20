import { renderHook, waitFor } from '@testing-library/react';
import { useCartItemSelectedIdList } from './useCartItemSelectedIdList';
import { RecoilRoot } from 'recoil';
import { act } from 'react';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
  requestSetCartItemQuantity: jest.fn(),
}));

describe('useCartItemSelectedIdList hook test', () => {
  test('초기 quantity는 초기값 "[]"과 같아야 한다', () => {
    const { result } = renderHook(() => useCartItemSelectedIdList(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.selectedIdList).toStrictEqual([]);
  });

  test('addSelectedId를 호출하여 selectedIdList에 값을 추가할 수 있어야 한다', async () => {
    const { result } = renderHook(() => useCartItemSelectedIdList(), {
      wrapper: RecoilRoot,
    });

    await act(async () => waitFor(() => result.current.addSelectedId(33)));

    expect(result.current.selectedIdList).toStrictEqual([33]);
  });

  test('removeSelectedId를 호출하여 selectedIdList에서 값을 제거할 수 있어야 한다', async () => {
    const { result } = renderHook(() => useCartItemSelectedIdList(), {
      wrapper: RecoilRoot,
    });

    await act(async () => waitFor(() => result.current.addSelectedId(33)));
    await act(async () => waitFor(() => result.current.removeSelectedId(33)));

    expect(result.current.selectedIdList).toStrictEqual([]);
  });

  test('removeSelectedId를 호출하여 selectedIdList에서 값을 제거할 수 있어야 한다', async () => {
    const { result } = renderHook(() => useCartItemSelectedIdList(), {
      wrapper: RecoilRoot,
    });

    await act(async () => waitFor(() => result.current.addSelectedId(33)));
    await act(async () => waitFor(() => result.current.removeSelectedId(33)));

    expect(result.current.selectedIdList).toStrictEqual([]);
  });
});
