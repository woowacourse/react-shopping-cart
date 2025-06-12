import {
  DELIVERY_PRICE,
  DELIVERY_PRICE_THRESHOLD,
} from '../../src/constants/config';
import calculateDeliveryPrice from '../../src/utils/calculateDeliveryPrice';

describe('calculateDeliveryPrice 테스트', () => {
  test('주문 금액이 0원인 경우 배송비는 0원이어야 한다', () => {
    const result = calculateDeliveryPrice(0);
    expect(result).toBe(0);
  });
  test('주문 금액이 배송비 기준 금액 이상인 경우 배송비는 0원이어야 한다', () => {
    const result = calculateDeliveryPrice(DELIVERY_PRICE_THRESHOLD);
    expect(result).toBe(0);
  });
  test('주문 금액이 배송비 기준 금액 미만인 경우 배송비는 기본 배송비이어야 한다', () => {
    const result = calculateDeliveryPrice(DELIVERY_PRICE_THRESHOLD - 1);
    expect(result).toBe(DELIVERY_PRICE);
  });
  test('제주도 및 도서산간 지역의 경우 배송비가 추가되어야 한다', () => {
    const result = calculateDeliveryPrice(DELIVERY_PRICE_THRESHOLD - 1, true);
    expect(result).toBe(DELIVERY_PRICE + 3000);
  });
});
