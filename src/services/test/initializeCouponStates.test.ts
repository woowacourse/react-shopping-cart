import { DISCOUNT_CODE } from '@/constants/discount';
import MOCK_CART_ITEMS from '@/__mocks__/response/cartItems';
import MOCK_FORMATTED_COUPONS from '@/__mocks__/response/coupons';
import initializeCouponStates from '../initializeCouponStates';

describe('initializeCouponStates', () => {
  it('구매 금액이 100,000원 미만일 때, 5,000원 할인 쿠폰은 사용 불가하다.', () => {
    const updatedCoupons = initializeCouponStates({
      allCoupons: MOCK_FORMATTED_COUPONS,
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 50000,
    });

    const fixed5000Coupon = updatedCoupons.find(
      (coupon) => coupon.code === DISCOUNT_CODE.FIXED5000,
    );
    expect(fixed5000Coupon?.isAvailable).toBe(false);
  });

  it('유효기간이 지난 쿠폰은 사용 불가능 하여 isAvailable 속성이 false가 된다.', () => {
    const expiredCoupon = { ...MOCK_FORMATTED_COUPONS[0], expirationDate: '2023-11-30' };
    const updatedCoupons = initializeCouponStates({
      allCoupons: [expiredCoupon],
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 100000,
    });

    expect(updatedCoupons[0].isAvailable).toBe(false);
  });

  it('동일한 제품이 3개 이상일 때, 2개 구매 시 1개 무료 쿠폰은 사용 가능하다.', () => {
    const updatedCoupons = initializeCouponStates({
      allCoupons: MOCK_FORMATTED_COUPONS,
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 100000,
    });

    const bogoCoupon = updatedCoupons.find((coupon) => coupon.code === DISCOUNT_CODE.BOGO);
    expect(bogoCoupon?.isAvailable).toBe(true);
  });

  it('총 구매 금액이 10만원 이상일 때, 5만원 이상 구매 시 무료 배송 쿠폰은 사용 불가하다.', () => {
    const updatedCoupons = initializeCouponStates({
      allCoupons: MOCK_FORMATTED_COUPONS,
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 100000,
    });

    const freeShippingCoupon = updatedCoupons.find(
      (coupon) => coupon.code === DISCOUNT_CODE.FREE_SHIPPING,
    );
    expect(freeShippingCoupon?.isAvailable).toBe(false);
  });

  it('미라클 모닝 30% 할인 쿠폰이 유효한 시간(오전 4시부터 오전 7시 사이에) 사용 가능하다.', () => {
    const currentTime = new Date();
    currentTime.setHours(5);
    jest.spyOn(global, 'Date').mockImplementation(() => currentTime);

    const updatedCoupons = initializeCouponStates({
      allCoupons: MOCK_FORMATTED_COUPONS,
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 100000,
    });

    const miracleSaleCoupon = updatedCoupons.find(
      (coupon) => coupon.code === DISCOUNT_CODE.MIRACLESALE,
    );
    expect(miracleSaleCoupon?.isAvailable).toBe(true);

    jest.spyOn(global, 'Date').mockRestore();
  });

  it('미라클 모닝 30% 할인 쿠폰이 유효한 시간이 아닐 때 사용 불가하다.', () => {
    const currentTime = new Date();
    currentTime.setHours(8);
    jest.spyOn(global, 'Date').mockImplementation(() => currentTime);

    const updatedCoupons = initializeCouponStates({
      allCoupons: MOCK_FORMATTED_COUPONS,
      allCartItems: MOCK_CART_ITEMS,
      orderAmount: 100000,
    });

    const miracleSaleCoupon = updatedCoupons.find(
      (coupon) => coupon.code === DISCOUNT_CODE.MIRACLESALE,
    );
    expect(miracleSaleCoupon?.isAvailable).toBe(false);

    jest.spyOn(global, 'Date').mockRestore();
  });
});
