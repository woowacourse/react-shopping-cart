import { validateCoupon } from './validateCoupon';
import { CouponType } from '@entities/coupon/type/coupon.type';
import { CartItemType } from '@entities/cart';

describe('validateCoupon', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateString = futureDate.toISOString();

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);
  const pastDateString = pastDate.toISOString();

  describe('FIXED5000 쿠폰 검증', () => {
    const fixed5000Coupon: CouponType = {
      id: 1,
      description: '5000원 할인 쿠폰',
      code: 'FIXED5000',
      discountType: 'fixed',
      discount: 5000,
      minimumAmount: 50000,
      expirationDate: futureDateString,
    };

    it('최소 주문 금액을 만족하면 true를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 60000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: fixed5000Coupon, orderItems })).toBe(true);
    });

    it('최소 주문 금액을 만족하지 않으면 false를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 40000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: fixed5000Coupon, orderItems })).toBe(false);
    });

    it('만료된 쿠폰은 false를 반환한다', () => {
      const expiredCoupon = { ...fixed5000Coupon, expirationDate: pastDateString };
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 60000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: expiredCoupon, orderItems })).toBe(false);
    });
  });

  describe('BOGO 쿠폰 검증', () => {
    const bogoCoupon: CouponType = {
      id: 2,
      description: '하나 더! 쿠폰',
      code: 'BOGO',
      discountType: 'buyXgetY',
      buyQuantity: 2,
      getQuantity: 1,
      expirationDate: futureDateString,
    };

    it('구매 수량이 조건을 만족하면 true를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 3,
          },
        },
      ];

      expect(validateCoupon({ coupon: bogoCoupon, orderItems })).toBe(true);
    });

    it('구매 수량이 조건을 만족하지 않으면 false를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 2,
          },
        },
      ];

      expect(validateCoupon({ coupon: bogoCoupon, orderItems })).toBe(false);
    });

    it('만료된 쿠폰은 false를 반환한다', () => {
      const expiredCoupon = { ...bogoCoupon, expirationDate: pastDateString };
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 3,
          },
        },
      ];

      expect(validateCoupon({ coupon: expiredCoupon, orderItems })).toBe(false);
    });
  });

  describe('FREESHIPPING 쿠폰 검증', () => {
    const freeShippingCoupon: CouponType = {
      id: 3,
      description: '무료배송 쿠폰',
      code: 'FREESHIPPING',
      discountType: 'freeShipping',
      minimumAmount: 30000,
      expirationDate: futureDateString,
    };

    it('최소 주문 금액을 만족하면 true를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 35000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: freeShippingCoupon, orderItems })).toBe(true);
    });

    it('최소 주문 금액을 만족하지 않으면 false를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 25000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: freeShippingCoupon, orderItems })).toBe(false);
    });

    it('만료된 쿠폰은 false를 반환한다', () => {
      const expiredCoupon = { ...freeShippingCoupon, expirationDate: pastDateString };
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 35000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: expiredCoupon, orderItems })).toBe(false);
    });
  });

  describe('MIRACLESALE 쿠폰 검증', () => {
    const currentHour = new Date().getHours();
    const miracleSaleCoupon: CouponType = {
      id: 4,
      description: '미라클 세일 쿠폰',
      code: 'MIRACLESALE',
      discountType: 'percentage',
      discount: 10,
      availableTime: {
        start: (currentHour - 1).toString().padStart(2, '0') + ':00',
        end: (currentHour + 1).toString().padStart(2, '0') + ':00',
      },
      expirationDate: futureDateString,
    };

    it('유효 시간 내에는 true를 반환한다', () => {
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: miracleSaleCoupon, orderItems })).toBe(true);
    });

    it('유효 시간이 지나면 false를 반환한다', () => {
      const invalidTimeCoupon = {
        ...miracleSaleCoupon,
        availableTime: {
          start: '00:00',
          end: '01:00',
        },
      };
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: invalidTimeCoupon, orderItems })).toBe(false);
    });

    it('만료된 쿠폰은 false를 반환한다', () => {
      const expiredCoupon = { ...miracleSaleCoupon, expirationDate: pastDateString };
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: expiredCoupon, orderItems })).toBe(false);
    });
  });

  describe('알 수 없는 쿠폰 코드 검증', () => {
    it('알 수 없는 쿠폰 코드는 true를 반환한다', () => {
      const unknownCoupon = {
        id: 5,
        description: '알 수 없는 쿠폰',
        code: 'UNKNOWN',
        discountType: 'fixed',
        discount: 1000,
        minimumAmount: 10000,
        expirationDate: futureDateString,
      } as unknown as CouponType;
      const orderItems: CartItemType[] = [
        {
          id: 1,
          quantity: 1,
          product: {
            id: 1,
            name: '상품1',
            price: 10000,
            imageUrl: 'image.jpg',
            quantity: 1,
          },
        },
      ];

      expect(validateCoupon({ coupon: unknownCoupon, orderItems })).toBe(true);
    });
  });
});
