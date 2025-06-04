import { getCheckedItems, getOrderPrice } from '../../src/utils';
import getDiscountPrice from '../../src/utils/getDiscountPrice';
import { mockCartItems } from '../mocks';

describe('쿠폰 적용된 금액을 반환하는 함수 테스트', () => {
  const checkedCartIds = [2, 3, 4];
  const checkedItems = getCheckedItems(mockCartItems, checkedCartIds);
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
    it('선택한 상품 목록과 배송비, 그리고 고정 쿠폰 정보를 제공하면 할인된 금액을 반환한다.', () => {
      expect(getDiscountPrice(checkedItems, deliveryPrice, fixedCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice - fixedCoupon.discount
      );
    });

    it('선택한 상품 목록과 배송비, 그리고 고정 쿠폰 정보를 제공했을 때 최소 금액을 충족하지 못하면 처음 금액 그대로 반환한다.', () => {
      const checkedCartIds = [3, 4];
      expect(getDiscountPrice(checkedItems, deliveryPrice, fixedCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice
      );
    });
  });

  describe('X+Y 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 X+Y 쿠폰 정보를 제공하면 할인된 금액을 반환한다.', () => {
      expect(getDiscountPrice(checkedItems, deliveryPrice, bogoCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice - fixedCoupon.discount
      );
    });

    it('선택한 상품 목록과 배송비, 그리고 X+Y 쿠폰 정보를 제공했을 때 X개의 상품이 없다면 처음 금액 그대로 반환한다.', () => {
      const checkedCartIds = [4];
      expect(getDiscountPrice(checkedItems, deliveryPrice, bogoCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice
      );
    });
  });

  describe('무료 배송 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 무료 배송 쿠폰 정보를 제공하면 할인된 금액을 반환한다.', () => {
      expect(getDiscountPrice(checkedItems, deliveryPrice, freeShippingCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds)
      );
    });

    it('선택한 상품 목록과 배송비, 그리고 무료 배송 쿠폰 정보를 제공했을 때 최소 금액을 충족하지 못하면 처음 금액 그대로 반환한다.', () => {
      const checkedCartIds = [3, 4];
      expect(getDiscountPrice(checkedItems, deliveryPrice, freeShippingCoupon)).toBe(
        getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice
      );
    });
  });

  describe('퍼센트 할인 쿠폰 테스트', () => {
    it('선택한 상품 목록과 배송비, 그리고 퍼센트 할인 쿠폰 정보를 제공하면 할인된 금액을 반환한다.', () => {
      expect(getDiscountPrice(checkedItems, deliveryPrice, percentageCoupon)).toBe(
        (getOrderPrice(mockCartItems, checkedCartIds) + deliveryPrice) *
          ((100 - fixedCoupon.discount) / 100)
      );
    });
  });
});
