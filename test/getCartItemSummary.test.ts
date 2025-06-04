import shoppingCart from '../src/mocks/shoppingCart.json';
import { getCartItemSummary } from '../src/utils/getCartItemSummary';

describe('getCartItemSummary 함수 동작을 검증한다', () => {
  it.each([
    [['7124', '7161', '7457'], 114800],
    [['7124', '7161'], 14800],
    [['7457'], 100000],
  ])(
    '선택된 장바구니 아이템에 따라 총 금액을 계산할 수 있다,',
    (selectedCartIds, expectedTotalPrice) => {
      const { totalPrice } = getCartItemSummary(
        shoppingCart.content,
        selectedCartIds
      );
      expect(totalPrice).toBe(expectedTotalPrice);
    }
  );

  it.each([
    [['7124', '7161', '7457'], 4],
    [['7124', '7161'], 3],
    [['7457'], 1],
  ])(
    '선택된 장바구니 아이템의 총 수량을 계산할 수 있다,',
    (selectedCartIds, expectedTotalQuantity) => {
      const { totalQuantity } = getCartItemSummary(
        shoppingCart.content,
        selectedCartIds
      );
      expect(totalQuantity).toBe(expectedTotalQuantity);
    }
  );
});
