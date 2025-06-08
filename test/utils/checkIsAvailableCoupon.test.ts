import { Coupon } from '../../src/types';
import checkIsAvailableCoupon from '../../src/utils/checkIsAvailableCoupon';

describe('쿠폰 사용 가능 여부 확인 유틸 함수 테스트', () => {
  const deliveryPrice = 3000;
  const canUseCouponCartItems = [
    {
      id: 1,
      quantity: 2,
      product: {
        id: 24,
        name: '부리부리 원형 테이블',
        price: 100000,
        imageUrl:
          'https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg',
        category: '패션잡화',
      },
    },
  ];

  const canNotUseCouponCartItems = [
    {
      id: 1,
      quantity: 2,
      product: {
        id: 24,
        name: '부리부리 원형 테이블',
        price: 500,
        imageUrl:
          'https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg',
        category: '패션잡화',
      },
    },
  ];

  const minimumCoupon = {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2025-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  };

  const bogoCoupon = {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2025-06-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  };

  const dateCoupon = {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2025-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  };

  const timeCoupon = {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  };

  const rightTime = { monthIndex: 7, day: 13, hour: 6, minute: 0 };
  const wrongTime = { monthIndex: 8, day: 1, hour: 7, minute: 1 };

  it('사용 가능한 쿠폰 정보와 선택한 상품 목록을 주면 true를 반환한다.', () => {
    jest
      .useFakeTimers()
      .setSystemTime(
        new Date(2025, rightTime.monthIndex, rightTime.day, rightTime.hour, rightTime.minute)
      );
    expect(
      checkIsAvailableCoupon(minimumCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeTruthy();
    expect(
      checkIsAvailableCoupon(dateCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeTruthy();
    expect(
      checkIsAvailableCoupon(timeCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeTruthy();
  });

  it('사용 기간이 만료된 쿠폰 정보와 선택한 상품 목록을 주면 false를 반환한다.', () => {
    jest
      .useFakeTimers()
      .setSystemTime(
        new Date(2025, wrongTime.monthIndex, wrongTime.day, rightTime.hour, rightTime.minute)
      );
    expect(
      checkIsAvailableCoupon(dateCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeFalsy();
  });

  it('사용 시간이 만료된 쿠폰 정보와 선택한 상품 목록을 주면 false를 반환한다.', () => {
    jest
      .useFakeTimers()
      .setSystemTime(
        new Date(2025, rightTime.monthIndex, rightTime.day, wrongTime.hour, wrongTime.minute)
      );
    expect(
      checkIsAvailableCoupon(timeCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeFalsy();
  });

  it('쿠폰 정보와 최소 금액을 충족하지 못한 상품 목록을 주면 false를 반환한다.', () => {
    expect(
      checkIsAvailableCoupon(minimumCoupon as Coupon, canNotUseCouponCartItems, deliveryPrice)
    ).toBeFalsy();
  });

  it('bogo 타입의 쿠폰을 사용할 때 상품의 개수가 적으면 false를 반환한다.', () => {
    expect(
      checkIsAvailableCoupon(bogoCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeFalsy();
  });

  it('freeShipping 타입의 쿠폰을 사용할 때 배송비가 0원이면 false를 반환한다.', () => {
    const deliveryPrice = 0;
    expect(
      checkIsAvailableCoupon(dateCoupon as Coupon, canUseCouponCartItems, deliveryPrice)
    ).toBeFalsy();
  });
});
