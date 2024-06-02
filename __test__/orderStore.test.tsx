import {
  mockChecked,
  mockProductAmount10_000,
  mockProductAmount160_000,
  mockProduct_two,
} from './mock';
import { renderHookAtOrder } from './renderHook.util';

describe('orderStore 테스트', () => {
  describe('orderAmountState selector 테스트', () => {
    it('20,000원 상품 8개를 주문하면, orderAmountState가 160,000원이 된다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        isChecked: { 9084: true },
      });

      const orderAmount =
        mockProductAmount160_000[0].quantity * mockProductAmount160_000[0].product.price;

      expect(result.current.orderAmount).toEqual(orderAmount);
    });

    it('두 종류의 상품 중 한가지만 선택하면, 선택한 id 1000 상품만 orderAmount에 반영된다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProduct_two,
        isChecked: { 9084: false, 1000: true },
      });

      const orderAmount = mockProduct_two[1].quantity * mockProduct_two[1].product.price;

      expect(result.current.orderAmount).toEqual(orderAmount);
    });
  });

  describe('totalAmountState selector 테스트', () => {
    it('주문 금액 160,000원이고 추가 배송비가 있을 때, FIXED5000과 MIRACLESALE 쿠폰 적용 금액은 110,000원이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        hasAdditionalShippingFee: true,
        activeCoupons: ['FIXED5000', 'MIRACLESALE'],
      });

      expect(result.current.totalAmount).toEqual(110_000);
    });

    it('주문 금액 160,000원이고 추가 배송비가 있을 때, BOGO과 MIRACLESALE 쿠폰 적용 금액은 95,000원이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        hasAdditionalShippingFee: true,
        activeCoupons: ['BOGO', 'MIRACLESALE'],
      });

      expect(result.current.totalAmount).toEqual(95_000);
    });

    it('주문 금액 160,000원이고 추가 배송비가 있을 때, FIXED5000과 FREESHIPPING 쿠폰 적용 금액은 155,000원이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        hasAdditionalShippingFee: true,
        activeCoupons: ['FIXED5000', 'FREESHIPPING'],
      });

      expect(result.current.totalAmount).toEqual(155_000);
    });
  });

  describe('totalProductQuantityState 테스트', () => {
    it('ID 9084 상품과 ID 1000 상품 중 9084 상품만 선택 시, 주문한 상품과 수량은 각각 1개, 1개이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProduct_two,
        isChecked: { 9084: true, 1000: false },
      });

      expect(result.current.totalProductQuantity.totalCount).toEqual(1);
      expect(result.current.totalProductQuantity.totalQuantity).toEqual(1);
    });

    it('ID 9084 상품과 ID 1000 상품 중 둘 다 선택 시, 주문한 상품과 수량은 각각 2개, 2개이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProduct_two,
        isChecked: { 9084: true, 1000: true },
      });

      expect(result.current.totalProductQuantity.totalCount).toEqual(2);
      expect(result.current.totalProductQuantity.totalQuantity).toEqual(2);
    });
  });

  describe('totalShippingFeeState 테스트', () => {
    it('주문 금액이 100,000원 이상이고 추가 배송비가 있다면, 기본 배송비는 0원이고 총 배송비는 3,000원 이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        isChecked: mockChecked,
        hasAdditionalShippingFee: true,
      });

      expect(result.current.totalShippingFee.baseShippingFee).toEqual(0);
      expect(result.current.totalShippingFee.totalShippingFee).toEqual(3000);
    });

    it('주문 금액이 100,000원 이상이고 추가 배송비가 없다면, 기본 배송비는 0원이고 총 배송비는 0원 이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount160_000,
        isChecked: mockChecked,
        hasAdditionalShippingFee: false,
      });

      expect(result.current.totalShippingFee.baseShippingFee).toEqual(0);
      expect(result.current.totalShippingFee.totalShippingFee).toEqual(0);
    });
    it('주문 금액이 100,000원 미만이고 추가 배송비가 없다면, 기본 배송비는 3000원이고 총 배송비는 0원 이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount10_000,
        isChecked: mockChecked,
        hasAdditionalShippingFee: false,
      });

      expect(result.current.totalShippingFee.baseShippingFee).toEqual(3000);
      expect(result.current.totalShippingFee.totalShippingFee).toEqual(3000);
    });

    it('주문 금액이 100,000원 미만이고 추가 배송비가 있다면, 기본 배송비는 3000원이고 총 배송비는 6000원 이다.', () => {
      const { result } = renderHookAtOrder({
        products: mockProductAmount10_000,
        isChecked: mockChecked,
        hasAdditionalShippingFee: true,
      });

      expect(result.current.totalShippingFee.baseShippingFee).toEqual(3000);
      expect(result.current.totalShippingFee.totalShippingFee).toEqual(6000);
    });
  });
});
