/**
 * requestCartItemList를 모킹해야한다.
 * 그리고 updateCarTItemList를 실행해 모킹 데이터가 제대로 들어갔는지 확인.
 *
 * requestDeleteCartITem을 모킹해야한다.
 * 0번 지우고 나머지들로 리스트 구성되는지 확인
 */

import { renderHook } from '@testing-library/react';
import { useCartItemList } from './hooks';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ReactNode, act } from 'react';
import { cartItemListAtom } from './states';
import { cartItemListTestData } from '../testData/cartItemListTestData';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
  requestCartItemList: jest.fn().mockImplementation(() => cartItemListTestData),
  requestDeleteCartItem: jest.fn(),
}));

describe('useCardItemList 테스트', () => {
  const useCartItemListState = () => useRecoilValue(cartItemListAtom);

  it('장바구니 목록을 새로 요청해 갱신한다.', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => <RecoilRoot>{children}</RecoilRoot>;

    const { result } = renderHook(
      () => {
        const { updateCartItemList } = useCartItemList();
        const state = useCartItemListState();

        return { updateCartItemList, state };
      },
      { wrapper },
    );

    await act(() => result.current.updateCartItemList());

    expect(result.current.state).toEqual(cartItemListTestData);
  });

  it('장바구니 목록 중 아이템 하나를 제거한다.', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <RecoilRoot initializeState={({ set }) => set(cartItemListAtom, cartItemListTestData)}>{children}</RecoilRoot>
    );

    const { result } = renderHook(
      () => {
        const { deleteCartItem } = useCartItemList();
        const state = useCartItemListState();

        return { deleteCartItem, state };
      },
      { wrapper },
    );

    await act(() => result.current.deleteCartItem(cartItemListTestData[0].cartItemId));

    expect(result.current.state).toEqual([cartItemListTestData[1]]);
  });
});
