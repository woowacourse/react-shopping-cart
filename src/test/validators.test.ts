import { mockCoupons } from '../mocks/coupons';
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

  describe('isCouponValid', () => {
    it('만료일이 지난 쿠폰은 유효하지 않다', () => {
      const EXPIRED_COUPON = mockCoupons[0];
      const { validateCoupon } = couponValidator();

      expect(validateCoupon(EXPIRED_COUPON)).toBe(false);
    });

    it('만료일이 지나지 않은 쿠폰은 유효하다', () => {
      const VALID_COUPON = mockCoupons[1];
      const { validateCoupon } = couponValidator();

      expect(validateCoupon(VALID_COUPON)).toBe(true);
    });
  });

  describe('couponApplicabilityValidator', () => {
    describe('FIXED', () => {
      it('주문 금액이 최소 주문 금액 미만이면 쿠폰 적용 불가하다', () => {
        const TEST_COUPON = mockCoupons[1];
        const INAPPLICABLE_TOTAL_AMOUNT = 90000;

        const { validateCouponApplicability } = couponApplicabilityValidator();

        expect(
          validateCouponApplicability(TEST_COUPON, INAPPLICABLE_TOTAL_AMOUNT),
        ).toBe(false);
      });

      it('주문 금액이 최소 주문 금액 이상이면 쿠폰 적용 가능하다.', () => {
        const TEST_COUPON = mockCoupons[1];
        const APPLICABLE_TOTAL_AMOUNT = 100000;

        const { validateCouponApplicability } = couponApplicabilityValidator();

        expect(
          validateCouponApplicability(TEST_COUPON, APPLICABLE_TOTAL_AMOUNT),
        ).toBe(true);
      });
    });

    describe('MIRACLE_SALE', () => {
      it('사용 가능 시간 외에는 쿠폰 적용이 불가하다', () => {
        const INAPPLICABLE_TIME = new Date('2023-05-01T08:00:00');
        const TEST_COUPON = mockCoupons[4];
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
        const TEST_COUPON = mockCoupons[4];
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
    });

    describe('FREE_SHIPPING', () => {
      it('배송비 쿠폰의 경우 100,000원이 넘으면 쿠폰 적용이 불가하다.', () => {
        const TEST_COUPON = mockCoupons[3];
        const INAPPLICABLE_TOTAL_AMOUNT = 100000;

        const { validateCouponApplicability } = couponApplicabilityValidator();

        expect(
          validateCouponApplicability(TEST_COUPON, INAPPLICABLE_TOTAL_AMOUNT),
        ).toBe(false);
      });

      it('배송비 쿠폰의 경우 최소 주문 금액 이상 100,000원 미만이면 쿠폰 적용이 가능하다.', () => {
        const TEST_COUPON = mockCoupons[3];
        const APPLICABLE_TOTAL_AMOUNT = 90000;

        const { validateCouponApplicability } = couponApplicabilityValidator();

        expect(
          validateCouponApplicability(TEST_COUPON, APPLICABLE_TOTAL_AMOUNT),
        ).toBe(true);
      });
    });
  });
});
