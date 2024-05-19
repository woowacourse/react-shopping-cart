import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import cartListMockData from '../src/mocks/cartListMockData';
import { cartItemSelected } from '../src/recoil/atoms';
import { cartListTotalPrice } from '../src/recoil/selectors';

describe('cartListTotalPrice', () => {
  it('아무것도 선택하지 않았을 때 주문 금액의 합계는 0원이다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartListTotalPrice), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toBe(0);
    });
  });

  it('주문 금액의 합계는 선택된 아이템 금액의 합계다.', async () => {
    const [ITEM_A, ITEM_B] = cartListMockData.content;

    const { result } = renderHook(
      () => {
        const [, setItemASelected] = useRecoilState(
          cartItemSelected(ITEM_A.id)
        );
        const [, setItemBSelected] = useRecoilState(
          cartItemSelected(ITEM_B.id)
        );

        setItemASelected(true);
        setItemBSelected(true);

        const totalPrice = useRecoilValue(cartListTotalPrice);
        return totalPrice;
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current).toBe(
        ITEM_A.quantity * ITEM_A.product.price +
          ITEM_B.quantity * ITEM_B.product.price
      );
    });
  });
});
