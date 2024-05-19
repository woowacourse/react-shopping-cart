import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import cartListMockData from '../src/mocks/cartListMockData';
import { cartItemSelected } from '../src/recoil/atoms';
import { shippingFee } from '../src/recoil/selectors';

describe('shippingFee', () => {
  it('아무것도 선택하지 않았을 때 배송비는 3000원이다.', async () => {
    const { result } = renderHook(() => useRecoilValue(shippingFee), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toBe(3000);
    });
  });

  it('선택된 아이템의 총 금액이 100,000원 이하일 경우 배송비는 3000원이다.', async () => {
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

        return useRecoilValue(shippingFee);
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current).toBe(3000);
    });
  });

  it('선택된 아이템의 총 금액이 100,000원 이상일 경우 배송비는 0원이다.', async () => {
    const [ITEM_A, ITEM_B, ITEM_C] = cartListMockData.content;

    const { result } = renderHook(
      () => {
        const [, setItemASelected] = useRecoilState(
          cartItemSelected(ITEM_A.id)
        );
        const [, setItemBSelected] = useRecoilState(
          cartItemSelected(ITEM_B.id)
        );
        const [, setItemCSelected] = useRecoilState(
          cartItemSelected(ITEM_C.id)
        );

        setItemASelected(true);
        setItemBSelected(true);
        setItemCSelected(true);

        return useRecoilValue(shippingFee);
      },
      { wrapper: RecoilRoot }
    );

    await waitFor(() => {
      expect(result.current).toBe(0);
    });
  });
});
