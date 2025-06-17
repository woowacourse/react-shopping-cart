import { default as calculateOrderInfo } from '../src/domain/order/calculateOrderInfo';

describe('calculateOrderInfo', () => {
  const items = [
    { cartItemId: 1, productId: 1, name: '상품A', quantity: 2, price: 30000, imageUrl: '' },
    { cartItemId: 2, productId: 2, name: '상품B', quantity: 1, price: 50000, imageUrl: '' }
  ];

  it('총 주문 금액, 배송비, 결제 금액을 계산한다.', () => {
    const result = calculateOrderInfo(items, false, 5000);

    expect(result).toEqual({
      totalQuantity: 3,
      totalOrderAmount: 110000,
      totalDeliveryFee: 0,
      finalPaymentAmount: 105000
    });
  });

  it('도서산간 추가 배송비가 포함된다.', () => {
    const result = calculateOrderInfo(items, true, 0);

    expect(result.totalDeliveryFee).toBe(3000);
    expect(result.finalPaymentAmount).toBe(113000);
  });

  it('주문 금액이 10만원 미만이면 기본 배송비가 부과된다.', () => {
    const smallItems = [{ cartItemId: 1, productId: 1, name: '작은상품', quantity: 1, price: 20000, imageUrl: '' }];
    const result = calculateOrderInfo(smallItems, false, 0);

    expect(result.totalOrderAmount).toBe(20000);
    expect(result.totalDeliveryFee).toBe(3000);
    expect(result.finalPaymentAmount).toBe(23000);
  });
});
