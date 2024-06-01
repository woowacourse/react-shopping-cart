import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import cartListMockData from '../src/mocks/cartListMockData';
import { cartItemSelectedState, totalPriceSelector } from '../src/recoil';

describe('totalPriceSelector', () => {
  it('아무것도 선택하지 않았을 때 주문 금액의 합계는 0원이다.', async () => {
    const { result } = renderHook(() => useRecoilValue(totalPriceSelector), {
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
          cartItemSelectedState(ITEM_A.id)
        );
        const [, setItemBSelected] = useRecoilState(
          cartItemSelectedState(ITEM_B.id)
        );

        setItemASelected(true);
        setItemBSelected(true);

        const totalPrice = useRecoilValue(totalPriceSelector);
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
