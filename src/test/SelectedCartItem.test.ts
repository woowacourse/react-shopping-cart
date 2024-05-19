import { RecoilRoot, useRecoilState } from 'recoil';
import { renderHook } from '@testing-library/react';
import {
  cartItemsIdState,
  selectedAllCartItemState,
  selectedCartItemsState,
} from '../recoil/selectedCardItems';
describe('SelectedCartItems', () => {
  it('초기 선택은 모두 선택되어있는 상태', () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(selectedCartItemsState(productId)),
      {
        wrapper: RecoilRoot,
      },
    );
    expect(result.current[0]).toBe(true);
  });

  it('모든 상품들이 선택되었을 때 전체 선택이 선택된다.', async () => {
    const initialItems = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    const { result } = renderHook(
      () => useRecoilState(selectedAllCartItemState),
      {
        wrapper: RecoilRoot,
        initialProps: {
          initializeState: ({ set }: any) => {
            set(
              cartItemsIdState,
              initialItems.map((item) => item.id),
            );
            initialItems.forEach((item) => {
              set(selectedCartItemsState(item.id), true);
            });
          },
        },
      },
    );

    expect(result.current[0]).toBe(false);
  });
});
