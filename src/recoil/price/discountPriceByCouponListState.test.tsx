import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { discountPriceByCouponListState } from './discountPriceByCouponListState';
import { cartItemListState } from '../cartItemList/cartItemListState';
import { mockCartItemList } from '../../mocks/cartItemList';
import { selectedCouponListState } from '../couponList/selectedCouponListState';
import { selectedCartItemIdListState } from '../selectedCartItemList/selectedCartItemIdListState';
import { Coupon } from '../../types/coupon.type';

describe('discountPriceByCouponListState 테스트', () => {
  const fixedPrice = 5000;
  const fixedCoupon: Coupon = {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    discount: fixedPrice,
    discountType: 'fixed',
    minimumAmount: 100000,
    expirationDate: '2025-11-30',
    priority: 0,
  };

  const percentage = 50;
  const percentageCoupon: Coupon = {
    id: 1,
    code: 'FIXED5000',
    description: `${percentage} 할인 쿠폰`,
    discountType: 'percentage',
    discount: percentage,
    expirationDate: '2025-11-30',
    priority: 1,
  };

  const [buyQuantity, getQuantity] = [3, 2];
  const buyXgetYCoupon: Coupon = {
    id: 1,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    discountType: 'buyXgetY',
    buyQuantity,
    getQuantity,
    expirationDate: '2025-05-30',
    priority: 2,
  };

  const freeShippingCoupon: Coupon = {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    discountType: 'freeShipping',
    minimumAmount: 50000,
    expirationDate: '2025-08-31',
    priority: 0,
  };

  const initializeState = (couponList: Coupon[]) =>
    renderHook(() => useRecoilValue(discountPriceByCouponListState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemListState, mockCartItemList);
            set(selectedCartItemIdListState, [1]);
            set(selectedCouponListState, couponList);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

  describe('쿠폰 1개 적용 테스트', () => {
    it('fixed 타입의 쿠폰을 사용하면 고정 금액만큼 할인된다.', () => {
      const { result } = initializeState([fixedCoupon]);

      expect(result.current.price).toBe(fixedCoupon.discount);
    });

    it('percentage 타입의 쿠폰을 사용하면 비율 금액만큼 할인된다.', () => {
      const { result } = initializeState([percentageCoupon]);

      const cartItem = mockCartItemList[0];
      const totalPrice = cartItem.quantity * cartItem.product.price;
      const discountPrice = totalPrice * (percentage / 100);

      expect(result.current.price).toBe(discountPrice);
    });
    it('buyXgetY 타입의 쿠폰을 사용하면 y개 만큼의 상품 금액이 할인된다.', () => {
      const { result } = initializeState([buyXgetYCoupon]);

      const cartItem = mockCartItemList[0];
      const discountPrice = cartItem.product.price * getQuantity;

      expect(result.current.price).toBe(discountPrice);
    });
    it('freeShipping 타입의 쿠폰을 사용하면 배송비는 무료다.', () => {
      const { result } = initializeState([freeShippingCoupon]);

      expect(result.current.shippingFee).toBe('free');
    });
  });

  describe('쿠폰 2개 적용 테스트', () => {
    it('fixed, percentage 쿠폰이 선택되면 총 주문 금액에서 percentage만큼 할인된 금액 + 고정 금액이 할인된다.', () => {
      const { result } = initializeState([fixedCoupon, percentageCoupon]);

      const cartItem = mockCartItemList[0];
      const totalPrice = cartItem.quantity * cartItem.product.price;
      const percentageDiscountPrice = totalPrice * (percentage / 100);

      expect(result.current.price).toBe(percentageDiscountPrice + fixedPrice);
    });

    it('fixed, buyXgetY 쿠폰이 선택되면 고정 금액과 상품 금액만큼을 할인한다. ', () => {
      const { result } = initializeState([fixedCoupon, buyXgetYCoupon]);

      const cartItem = mockCartItemList[0];
      const buyXgetYDiscountPrice = cartItem.product.price * getQuantity;

      expect(result.current.price).toBe(fixedPrice + buyXgetYDiscountPrice);
    });

    it('fixed, freeShipping 쿠폰이 선택되면 고정금액이 할인되고 무료 배송이 적용된다.', () => {
      const { result } = initializeState([fixedCoupon, freeShippingCoupon]);

      expect(result.current.price).toBe(fixedPrice);
      expect(result.current.shippingFee).toBe('free');
    });

    it('percentage, buyXgetY 쿠폰이 선택되면 percentage할인을 먼저 적용하고 무료 재공 금액 * percentage 만큼을 추가 할인이 적용된다.', () => {
      const { result } = initializeState([percentageCoupon, buyXgetYCoupon]);

      const cartItem = mockCartItemList[0];
      const totalPrice = cartItem.quantity * cartItem.product.price;
      const percentageDiscountPrice = totalPrice * (percentage / 100);
      const buyXgetYDiscountPrice = cartItem.product.price * getQuantity * (percentage / 100);

      expect(result.current.price).toBe(percentageDiscountPrice + buyXgetYDiscountPrice);
    });
  });
});
