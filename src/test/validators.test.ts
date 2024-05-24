import { CouponType } from '../type';
import couponApplicabilityValidator from '../validators/couponApplicabilityValidator';
import couponValidator from '../validators/couponValidator';

describe('couponValidator', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-20'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('만료일이 지난 쿠폰은 유효하지 않다', () => {
    const EXPIRED_COUPON: CouponType = {
      id: 1,
      code: 'EXPIRED_COUPON',
      description: '만료된 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-01',
    };
    const { validateCoupon } = couponValidator();

    expect(validateCoupon(EXPIRED_COUPON)).toBe(false);
  });

  it('만료일이 지나지 않은 쿠폰은 유효하다', () => {
    const VALID_COUPON: CouponType = {
      id: 2,
      code: 'VALID_COUPON',
      description: '유효한 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-21',
    };
    const { validateCoupon } = couponValidator();

    expect(validateCoupon(VALID_COUPON)).toBe(true);
  });
});

describe('couponApplicabilityValidator', () => {
  it('주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가하다', () => {
    const TEST_COUPON = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed' as 'fixed',
      minimumAmount: 100000,
      expirationDate: '2024-11-30',
    };
    const INAPPLICABLE_TOTAL_AMOUNT = 90000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(TEST_COUPON, INAPPLICABLE_TOTAL_AMOUNT),
    ).toBe(false);
  });

  it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능하다.', () => {
    const TEST_COUPON = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed' as 'fixed',
      minimumAmount: 100000,
      expirationDate: '2024-11-30',
    };
    const APPLICABLE_TOTAL_AMOUNT = 100000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(TEST_COUPON, APPLICABLE_TOTAL_AMOUNT),
    ).toBe(true);
  });

  it('사용 가능 시간 외에는 쿠폰 적용이 불가하다', () => {
    const INAPPLICABLE_TIME = new Date('2023-05-01T08:00:00');
    const TEST_COUPON = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      discount: 30,
      discountType: 'percentage' as 'percentage',
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      expirationDate: '2024-07-31',
    };
    const TEST_TOTAL_AMOUNT = 100000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(
        TEST_COUPON,
        TEST_TOTAL_AMOUNT,
        INAPPLICABLE_TIME,
      ),
    ).toBe(false);
  });

  it('사용 가능 시간 내에는 쿠폰 적용이 가능하다.', () => {
    const APPLICABLE_TIME = new Date('2023-05-01T06:00:00');
    const TEST_COUPON = {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      discount: 30,
      discountType: 'percentage' as 'percentage',
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      expirationDate: '2024-07-31',
    };
    const TEST_TOTAL_AMOUNT = 100000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(
        TEST_COUPON,
        TEST_TOTAL_AMOUNT,
        APPLICABLE_TIME,
      ),
    ).toBe(true);
  });

  it('배송비 쿠폰의 경우 100,000원이 넘으면 쿠폰 적용이 불가하다.', () => {
    const TEST_COUPON = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      discountType: 'freeShipping' as 'freeShipping',
      minimumAmount: 50000,
      expirationDate: '2024-08-31',
    };
    const INAPPLICABLE_TOTAL_AMOUNT = 100000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(TEST_COUPON, INAPPLICABLE_TOTAL_AMOUNT),
    ).toBe(false);
  });

  it('배송비 쿠폰의 경우 최소 주문 금액 이상 100,000원 미만이면 쿠폰 적용이 가능하다.', () => {
    const TEST_COUPON = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      discountType: 'freeShipping' as 'freeShipping',
      minimumAmount: 50000,
      expirationDate: '2024-08-31',
    };
    const APPLICABLE_TOTAL_AMOUNT = 90000;

    const { validateCouponApplicability } = couponApplicabilityValidator();

    expect(
      validateCouponApplicability(TEST_COUPON, APPLICABLE_TOTAL_AMOUNT),
    ).toBe(true);
  });
});
