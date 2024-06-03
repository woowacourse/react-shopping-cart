import { renderHook } from '@testing-library/react';
import { useCartItemList } from './useCartItemList';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ReactNode, act } from 'react';
import { cartItemListState } from '../recoil/cartItemList/cartItemListState';
import { mockCartItemList } from '../mocks/cartItemList';
import '@testing-library/jest-dom';

jest.mock('../apis/requests/cartItemList', () => ({
  requestCartItemList: jest.fn().mockImplementation(() => mockCartItemList),
  requestDeleteCartItem: jest.fn(),
}));

describe('useCardItemList 테스트', () => {
  const useCartItemListState = () => useRecoilValue(cartItemListState);

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

    expect(result.current.state).toEqual(mockCartItemList);
  });

  it('장바구니 목록 중 아이템 하나를 제거한다.', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <RecoilRoot initializeState={({ set }) => set(cartItemListState, mockCartItemList)}>{children}</RecoilRoot>
    );

    const { result } = renderHook(
      () => {
        const { deleteCartItem } = useCartItemList();
        const state = useCartItemListState();

        return { deleteCartItem, state };
      },
      { wrapper },
    );

    await act(() => result.current.deleteCartItem(mockCartItemList[0].cartItemId));

    expect(result.current.state).toEqual([mockCartItemList[1]]);
  });
});
