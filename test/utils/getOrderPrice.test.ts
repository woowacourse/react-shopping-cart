import getOrderPrice from '../../src/utils/getOrderPrice';
import { mockCartItems } from '../mocks';

describe('getOrderPrice 유틸 함수 테스트', () => {
  it('상품 목록과 선택 여부를 받아서 주문 금액을 계산한다.', () => {
    const orderPrice = getOrderPrice(mockCartItems, [1, 3]);
    let totalPrice = 0;
    mockCartItems.forEach((item) => {
      if (item.id === 1 || item.id === 3) {
        totalPrice += item.quantity * item.product.price;
      }
    });

    expect(orderPrice).toBe(totalPrice);
  });
});
