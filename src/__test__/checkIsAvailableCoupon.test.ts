import { BuyXGetYCoupon, CartItem, FixedDiscountCoupon, FreeShippingCoupon } from '../type';

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
    it('buyQuantity가 가장 수량이 많은 물품의 수량보다 클 경우 쿠폰을 사용할 수 없다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY + 1,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(false);
    });

    it('buyQuantity가 가장 수량이 많은 물품의 수량보다 같을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY,
      };

      //when
      const result = checkIsAvailableCoupon(coupon, DUMMY_ITEMS, 0);

      //then
      expect(result).toBe(true);
    });

    it('buyQuantity가 가장 수량이 많은 물품의 수량보다 작을 경우 쿠폰을 사용할 수 있다.', () => {
      // given
      const coupon: BuyXGetYCoupon = {
        ...DUMMY_BUY_X_GET_Y_COUPON,
        buyQuantity: MAX_QUANTITY - 1,
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

  // TODO: percentage 쿠폰
});
