import { renderHook, waitFor } from '@testing-library/react';
import { mockCartItems } from './mocks';
import useCheckedCartItems from '../src/hooks/useCheckedCartItems';
import { act } from 'react';
import getIdsFromCartItems from '../src/utils/getIdsFromCartItems';

describe('선택된 요소 상태 관리 훅 테스트', () => {
  it('장바구니 배열이 주어지면 초기 상태로 장바구니 상품의 id 배열을 담는다.', async () => {
    const { result } = renderHook(() => useCheckedCartItems());
    act(() => result.current.init(mockCartItems));
    await waitFor(() => {
      expect(result.current.checkedCartIds).toEqual(
        getIdsFromCartItems(mockCartItems)
      );
    });
  });

  it('추가할 id를 주면 선택된 요소 상태 배열에 추가된다.', async () => {
    const { result } = renderHook(() => useCheckedCartItems());
    act(() => result.current.init(mockCartItems));
    const addId = 6;

    act(() => result.current.addCheckedCartItem(addId));
    await waitFor(() => {
      expect(result.current.checkedCartIds).toContain(addId);
    });
  });

  it('제거할 id를 주면 선택된 요소 상태 배열에 해당 id가 제거된다.', async () => {
    const { result } = renderHook(() => useCheckedCartItems());
    act(() => result.current.init(mockCartItems));
    const removeId = 1;

    act(() => result.current.removeCheckedCartItem(removeId));
    await waitFor(() => {
      expect(result.current.checkedCartIds).not.toContain(removeId);
    });
  });
});
