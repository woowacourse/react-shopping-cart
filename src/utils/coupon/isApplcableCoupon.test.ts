import { CartItem } from '../../types/cartItem.type';
import { Coupon } from '../../types/coupon.type';
import { isApplicableCoupon } from './isApplcableCoupon';

/**
 * 최소 금액 이상 -> 주문 금액 상태
 * 최소 주문 개수 -> 선택 항목 정보 목록 상태
 * 시간대
 */
describe('isApplicableCoupon', () => {
  describe('최소 주문 금액 테스트', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'HAS_MINIMUM_AMOUNT_COUPON',
      description: '최소 주문 금액이 있는 쿠폰',
      minimumAmount: 100_000,
      discountType: 'fixed',
      expirationDate: '2026-05-01',
      isApplicable: true,
      priority: 0,
    };

    it('최소 주문 금액 이상인 경우 쿠폰을 적용할 수 있다.', () => {
      const totalCartPrice = coupon.minimumAmount;

      expect(isApplicableCoupon({ coupon, totalCartPrice })).toBeTruthy();
    });

    it('최소 주문 금액 미만인 경우 쿠폰을 적용할 수 없다.', () => {
      const totalCartPrice = coupon.minimumAmount! - 1;

      expect(isApplicableCoupon({ coupon, totalCartPrice })).toBeFalsy();
    });
  });

  describe('최소 구매 수량 테스트', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'HAS_MINIMUM_COUPON',
      description: '최소 구매 수량이 있는 쿠폰',
      discountType: 'fixed',
      expirationDate: '2026-05-01',
      buyQuantity: 3,
      getQuantity: 1,
      priority: 2,
      isApplicable: true,
    };

    it('최소 구매 수량 이상인 경우 쿠폰을 적용할 수 있다.', () => {
      const [buyQuantity, getQuantity] = [3, 1];
      const highQuantity = buyQuantity + getQuantity;
      const selectedCartItemList: CartItem[] = [
        {
          quantity: highQuantity,
          product: {
            id: 11,
            name: '리복',
            price: 20000,
            imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
            category: 'fashion',
          },
          cartItemId: 1,
        },
      ];

      expect(isApplicableCoupon({ coupon, selectedCartItemList })).toBeTruthy();
    });

    it('최소 구매 수량 미만인 경우 쿠폰을 적용할 수 없다.', () => {
      const [buyQuantity, getQuantity] = [1, 1];
      const lowQuantity = buyQuantity + getQuantity;
      const selectedCartItemList: CartItem[] = [
        {
          quantity: lowQuantity,
          product: {
            id: 11,
            name: '리복',
            price: 20000,
            imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
            category: 'fashion',
          },
          cartItemId: 1,
        },
      ];

      expect(isApplicableCoupon({ coupon, selectedCartItemList })).toBeFalsy();
    });
  });

  describe('사용 가능 시간 테스트', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'HAS_AVAILABLE_COUPON',
      description: '사용 가능 시간대가 있는 쿠폰',
      discountType: 'fixed',
      expirationDate: '2026-05-01',
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      priority: 2,
      isApplicable: true,
    };

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-01T06:00:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('사용 가능 시간대인 경우 쿠폰을 적용할 수 있다.', () => {
      coupon.availableTime = {
        start: '04:00:00',
        end: '07:00:00',
      };

      expect(isApplicableCoupon({ coupon })).toBeTruthy();
    });

    it('사용 가능 시간대가 아닌 경우 쿠폰을 적용할 수 없다.', () => {
      coupon.availableTime = {
        start: '15:00:00',
        end: '19:00:00',
      };

      expect(isApplicableCoupon({ coupon })).toBeFalsy();
    });
  });
});
