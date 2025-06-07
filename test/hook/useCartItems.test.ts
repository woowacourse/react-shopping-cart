import { renderHook, waitFor } from '@testing-library/react';
import { mockCartItems } from '../mocks';
import useCartItems from '../../src/hooks/useCartItems';

describe('장바구니 훅 테스트', () => {
  it('장바구니 아이템을 관리하는 상태를 생성한다.', async () => {
    const { result } = renderHook(() => useCartItems());
    await waitFor(() => {
      expect(result.current.cartItems).toEqual(mockCartItems);
    });
  });
});
