import { RecoilRoot, useRecoilState } from 'recoil';
import { renderHook } from '@testing-library/react';
import {
  cartItemQuantityState,
  cartItemQuantityAdjustSelector,
} from '../recoil/cartItems';
describe('SelectedCartItems', () => {
  it('전달된 값만큼 cartItemQuantity의 수량이 증가한다.', () => {
    const product = {
      id: 1000,
      quantity: 1,
    };
    const { result } = renderHook(
      () => useRecoilState(cartItemQuantityState(product.id)),
      {
        wrapper: RecoilRoot,
        initialProps: {
          initializeState: ({ set }: any) => {
            set(cartItemQuantityAdjustSelector, ++product.quantity);
          },
        },
      },
    );
    expect(result.current[0]).toBe(2);
  });
});
