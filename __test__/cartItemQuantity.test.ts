import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import cartListMockData from '../src/mocks/cartListMockData';
import { cartItemQuantity } from '../src/recoil/atoms';

describe('cartItemQuantity', () => {
  const [TEST_ITEM] = cartListMockData.content;

  test('존재하지 않는 아이템 아이디로 접근할 경우 수량은 0이 반환된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemQuantity(1)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(0);
    });
  });

  test('존재하는 아이템 아이디로 접근할 경우 cartList에 저장된 장바구니 아이템의 수량이 반환된다.', async () => {
    const { result } = renderHook(
      () => {
        return useRecoilValue(cartItemQuantity(TEST_ITEM.id));
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current).toBe(TEST_ITEM.quantity);
    });
  });

  test('장바구니 아이템의 수량을 변경할 경우 atom에 정상적으로 반영된다.', async () => {
    const { result } = renderHook(
      () => {
        const [quantity, setQuantity] = useRecoilState(
          cartItemQuantity(TEST_ITEM.id)
        );
        setQuantity((prev) => prev + 1);
        return quantity;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current).toBe(TEST_ITEM.quantity + 1);
    });
  });
});
