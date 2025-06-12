import { CartItem, Coupon } from '../../src/types';
import { getCheckedItems, getOrderPrice } from '../../src/utils';
import getDiscountPrice from '../../src/utils/getDiscountPrice';
import { mockCartItems } from '../mocks';

describe('쿠폰이 적용되어 할인된 금액을 반환하는 함수 테스트', () => {
  const checkedCartIds = [2, 3, 4];
  const deliveryPrice = 3000;
  const fixedCoupon = {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2025-11-30',
    discount: 5000,
    minimumAmount: 10000,
    discountType: 'fixed',
  } as const;

  const bogoCoupon = {
    id: 2,
    code: 'BOGO',
    description: '3개 구매 시 1개 무료 쿠폰',
    expirationDate: '2025-06-30',
    buyQuantity: 3,
    getQuantity: 1,
    discountType: 'buyXgetY',
  } as const;

  const freeShippingCoupon = {
    id: 3,
    code: 'FREESHIPPING',
    description: '1만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2025-08-31',
    minimumAmount: 10000,
    discountType: 'freeShipping',
  } as const;

  const percentageCoupon = {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2025-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  } as const;

  describe('고정 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 고정 쿠폰 정보를 제공하면 할인 금액을 반환한다.', () => {
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(fixedCoupon, checkedItems, deliveryPrice)).toBe(fixedCoupon.discount);
    });

    it('선택한 상품 목록과 배송비, 그리고 고정 쿠폰 정보를 제공했을 때 최소 금액을 충족하지 못하면 할인 금액은 없다.', () => {
      const checkedCartIds = [3, 4];
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(fixedCoupon, checkedItems, deliveryPrice)).toBe(0);
    });

    it('선택한 상품 목록과 배송비, 그리고 고정 쿠폰 정보를 제공했을 때 최소 금액을 충족하지 못하면 할인 금액은 없다.', () => {
      const checkedCartIds = [3, 4];
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(fixedCoupon, checkedItems, deliveryPrice)).toBe(0);
    });

    it('주문 금액이 쿠폰 최소 금액과 정확히 같을 때도 할인이 적용된다.', () => {
      const checkedItems = getCheckedItems(mockCartItems, [2]);
      const orderPrice = getOrderPrice(checkedItems);
      const newFixedCoupon = {
        ...fixedCoupon,
        minimumAmount: orderPrice,
      } as Coupon;
      expect(getDiscountPrice(newFixedCoupon, checkedItems, deliveryPrice)).toBe(
        newFixedCoupon.discount
      );

      newFixedCoupon.minimumAmount = orderPrice + 1;
      expect(getDiscountPrice(newFixedCoupon, checkedItems, deliveryPrice)).toBe(0);
    });
  });

  describe('X+Y 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 X+Y 쿠폰 정보를 제공하면 할인 금액을 반환한다.', () => {
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(bogoCoupon, checkedItems, deliveryPrice)).toBe(2000);
    });

    it('선택한 상품 목록과 배송비, 그리고 X+Y 쿠폰 정보를 제공했을 때 X+Y개의 상품이 없다면 할인 금액은 없다.', () => {
      const checkedCartIds = [4];
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(bogoCoupon, checkedItems, deliveryPrice)).toBe(0);
    });

    it('조건을 충족하는 상품이 여러 개 있다면 그 중 가장 비싼 상품 금액을 할인한다.', () => {
      const items = [
        { id: 1, quantity: 4, product: { id: 1, name: 'A', price: 3000 } },
        { id: 2, quantity: 4, product: { id: 2, name: 'B', price: 8000 } },
      ] as CartItem[];
      expect(getDiscountPrice(bogoCoupon, items, deliveryPrice)).toBe(8000); // 가장 비싼 B 할인
    });
  });

  describe('무료 배송 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 무료 배송 쿠폰 정보를 제공하면 할인 금액을 반환한다.', () => {
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(freeShippingCoupon, checkedItems, deliveryPrice)).toBe(deliveryPrice);
    });

    it('선택한 상품 목록과 배송비, 그리고 무료 배송 쿠폰 정보를 제공했을 때 최소 금액을 충족하지 못하면 할인 금액은 없다.', () => {
      const checkedCartIds = [3, 4];
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(freeShippingCoupon, checkedItems, deliveryPrice)).toBe(0);
    });

    it('배송비가 최소 금액과 정확히 같을 때도 배송비가 할인된다.', () => {
      const newFreeShippingCoupon = {
        ...freeShippingCoupon,
        minimumAmount: 10000,
      } as Coupon;
      const items = [
        { id: 1, quantity: 1, product: { id: 1, name: 'A', price: 10000 } },
      ] as CartItem[];
      expect(getDiscountPrice(newFreeShippingCoupon, items, deliveryPrice)).toBe(deliveryPrice);

      newFreeShippingCoupon.minimumAmount = 10000 + 1;
      expect(getDiscountPrice(newFreeShippingCoupon, items, deliveryPrice)).toBe(0);
    });

    it('배송비가 0원일 경우 무료배송 쿠폰을 적용해도 할인 금액은 0이다.', () => {
      const items = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(freeShippingCoupon, items, 0)).toBe(0);
    });
  });

  describe('퍼센트 할인 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 퍼센트 할인 쿠폰 정보를 제공하면 할인 금액을 반환한다.', () => {
      const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
      expect(getDiscountPrice(percentageCoupon, checkedItems, deliveryPrice)).toBe(
        getOrderPrice(checkedItems) * (percentageCoupon.discount / 100)
      );
    });
  });
});
