import {
  BuyXGetYCoupon,
  CartItem,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from '../type';

import checkIsAvailableCoupon from '../utils/checkIsAvailableCoupon';

const DUMMY_ITEMS: CartItem[] = [
  {
    id: 906,
    quantity: 11,
    product: {
      id: 21,
      name: '나이키',
      price: 20000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 1072,
    quantity: 2,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
  {
    id: 1073,
    quantity: 1,
    product: {
      id: 12,
      name: '컨버스',
      price: 20000,
      imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      category: 'fashion',
    },
  },
];

const DUMMY_ITEMS_AMOUNT = DUMMY_ITEMS.reduce(
  (acc, item) => acc + item.quantity * item.product.price,
  0,
);

describe('checkIsAvailableCoupon', () => {
  describe('FixedDiscountCoupon의 유효성 검사', () => {
    const DUMMY_FIXED_DISCOUNT_COUPON: FixedDiscountCoupon = {
      id: 6,
      code: 'WELCOMEBACK',
      description: '재방문 고객 대상 10,000원 할인 쿠폰',
      discount: 10000,
      discountType: 'fixed',
      minimumAmount: 10000,
      expirationDate: '2024-12-31',
    };
    it('minimumAmount이 총 가격보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT + 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(false);
    });

    it('minimumAmount이 총 가격과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });

    it('minimumAmount이 총 가격보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FixedDiscountCoupon = {
        ...DUMMY_FIXED_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT - 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });
  });

  describe('BuyXGetYCoupon의 유효성 검사', () => {
    const DUMMY_BUY_X_GET_Y_COUPON: BuyXGetYCoupon = {
      id: 7,
      code: 'BUY3GET2',
      description: '3개 구매 시 2개 무료 쿠폰',
      discountType: 'buyXgetY',
      buyQuantity: 3,
      getQuantity: 2,
      expirationDate: '2024-06-30',
    };

    const MAX_QUANTITY = Math.max(...DUMMY_ITEMS.map((item) => item.quantity));
    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 3,
        getQuantity: 4,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(false);
    });

    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 1,
        getQuantity: 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });

    it('buyQuantity+getQuantity가 가장 수량이 많은 물품의 수량보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 3,
        getQuantity: 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });
  });

  describe('FreeShippingCoupon의 유효성 검사', () => {
    const DUMMY_FREE_SHIPPING_DISCOUNT_COUPON: FreeShippingCoupon = {
      id: 8,
      code: 'NEWYEARFREESHIP',
      description: '신년맞이 무료 배송 쿠폰',
      discountType: 'freeShipping',
      minimumAmount: 30000,
      expirationDate: '2025-01-31',
    };
    it('minimumAmount이 총 가격보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT + 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(false);
    });

    it('minimumAmount이 총 가격과 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(true);
    });

    it('minimumAmount이 총 가격보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: FreeShippingCoupon = {
        ...DUMMY_FREE_SHIPPING_DISCOUNT_COUPON,
        minimumAmount: DUMMY_ITEMS_AMOUNT - 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 1000);

      //then
      expect(result).toBe(true);
    });
  });

  describe('PercentageCoupon의 유효성 검사', () => {
    const DUMMY_PERCENTAGE_DISCOUNT_COUPON: PercentageDiscountCoupon = {
      id: 14,
      code: 'BLACKFRIDAY50',
      description: '블랙프라이데이 50% 할인 쿠폰',
      discount: 50,
      discountType: 'percentage',
      availableTime: {
        start: '15:00:00',
        end: '16:59:59',
      },
      expirationDate: '2024-11-29',
    };
    it('현재 시간이 availableTime.start보다 빠르면 쿠폰을 사용할 수 없다.', () => {
      const beforeDate = new Date(2024, 5, 21, 14, 59, 59);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        beforeDate,
      );

      //then
      expect(result).toBe(false);
    });

    it('현재 시간이 availableTime.start와 같으면 쿠폰을 사용할 수 있다.', () => {
      const startDate = new Date(2024, 5, 21, 15, 0, 0);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        startDate,
      );

      //then
      expect(result).toBe(true);
    });

    it('현재 시간이 availableTime.end와 같으면 쿠폰을 사용할 수 있다.', () => {
      const endDate = new Date(2024, 5, 21, 16, 59, 59);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        endDate,
      );

      //then
      expect(result).toBe(true);
    });

    it('현재 시간이 availableTime.end와 느리면 쿠폰을 사용할 수 없다.', () => {
      const afterDate = new Date(2024, 5, 21, 17, 0, 0);

      //when
      const result = checkIsAvailableCoupon(
        DUMMY_PERCENTAGE_DISCOUNT_COUPON,
        DUMMY_ITEMS,
        1000,
        afterDate,
      );

      //then
      expect(result).toBe(false);
    });
  });
});
