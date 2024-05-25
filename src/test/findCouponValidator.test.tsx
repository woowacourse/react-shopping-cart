import { vi } from 'vitest';
import findCouponValidator from '../domain/findCouponValidator';

export const mockCouponList: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
  },
  {
    id: 4,
    code: 'MIRACLESALE',
    description: '미라클모닝 30% 할인 쿠폰',
    expirationDate: '2024-07-31',
    discount: 30,
    availableTime: {
      start: '04:00:00',
      end: '07:00:00',
    },
    discountType: 'percentage',
  },
];

describe('findCouponValidator', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-20'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('쿠폰의 만료일을 확인한다.', () => {
    it('만료일이 지난 쿠폰은 유효하지 않다.', () => {
      const { isCouponValid } = findCouponValidator(mockCouponList);

      expect(isCouponValid(mockCouponList[1])).toBe(false);
    });

    it('만료일이 지나지 않은 쿠폰은 유효하다.', () => {
      const { isCouponValid } = findCouponValidator(mockCouponList);

      expect(isCouponValid(mockCouponList[0])).toBe(true);
    });
  });

  describe('쿠폰 목록에서 만료일이 지나지 않은 쿠폰을 찾는다.', () => {
    it('만료일이 지나지 않은 사용 가능의 쿠폰의 갯수는 3개이다.', () => {
      const { validCoupon } = findCouponValidator(mockCouponList);

      expect(validCoupon().length).toBe(3);
    });
  });
});
