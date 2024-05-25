import { Coupon } from '../../types/coupon.type';
import {
  calcBuyXGetYDiscountAmount,
  calcFixedDiscountAmount,
  calcPercentageDiscountAmount,
  calcShippingFeeDiscountAmount,
} from './calcDiscountPriceByCoupon';

describe('쿠폰의 할인 금액을 계산하는 함수 테스트', () => {
  describe('배송비 할인 쿠폰', () => {
    const freeShippingCoupon: Coupon = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      discountType: 'freeShipping',
      minimumAmount: 50000,
      expirationDate: '2024-08-31',
      priority: 0,
      isApplicable: true,
    };

    it('배송비 무료 쿠폰인 경우 배송비는 free 문자열로 반환된다.', () => {
      const discountPrice = calcShippingFeeDiscountAmount(freeShippingCoupon);

      expect(discountPrice).toBe('free');
    });
  });

  describe('고정 금액 할인 쿠폰', () => {
    const fixedDiscountCoupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      minimumAmount: 100000,
      expirationDate: '2024-11-30',
      priority: 0,
      isApplicable: true,
    };

    it('할인 액은 고정 금액이다.', () => {
      const totalPrice = 100_000;
      const discountPrice = calcFixedDiscountAmount(fixedDiscountCoupon, totalPrice);

      expect(discountPrice).toBe(fixedDiscountCoupon.discount!);
    });

    it('만약 총 금액보다 더 큰 액수를 할인해야한다면 총 금액만큼을 할인 액으로 한다.', () => {
      const totalPrice = 1_000;
      const discountPrice = calcFixedDiscountAmount(fixedDiscountCoupon, totalPrice);

      expect(discountPrice).toBe(totalPrice);
    });
  });

  describe('비율 금액 할인 쿠폰', () => {
    const percentageDiscountCoupon: Coupon = {
      id: 4,
      code: 'MIRACLESALE',
      description: '30% 할인 쿠폰',
      discount: 30,
      discountType: 'percentage',
      expirationDate: '2024-07-31',
      priority: 1,
      isApplicable: true,
    };

    it('비율만큼의 금액이 할인 액이다.', () => {
      const totalPrice = 10_000;
      const discountPrice = calcPercentageDiscountAmount(percentageDiscountCoupon, totalPrice);

      expect(discountPrice).toBe((totalPrice * percentageDiscountCoupon.discount!) / 100);
    });

    it('소수가 나올 경우 내림해 할인 액으로 한다.', () => {
      const totalPrice = 324;
      const discountPrice = calcPercentageDiscountAmount(percentageDiscountCoupon, totalPrice);

      expect(discountPrice).toBe(Math.floor((totalPrice * percentageDiscountCoupon.discount!) / 100));
    });
  });

  describe('n개 사면 m개 무료 쿠폰', () => {
    const buyXgetYCoupon: Coupon = {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      discountType: 'buyXgetY',
      buyQuantity: 2,
      getQuantity: 1,
      expirationDate: '2024-04-30',
      priority: 0,
      isApplicable: true,
    };

    const selectedCartItemList = [
      {
        quantity: 10,
        product: {
          id: 11,
          name: '리복',
          price: 20000,
          imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
          category: 'fashion',
        },
        cartItemId: 1,
      },
      {
        quantity: 23,
        product: {
          id: 10,
          name: '퓨마',
          price: 10000,
          imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
          category: 'fashion',
        },
        cartItemId: 2,
      },
    ];

    it('할인 액수는 n + m개 이상인 상품 목록 중 가장 비싼 상품의 가격을 할인 액으로 한다.', () => {
      const discountPrice = calcBuyXGetYDiscountAmount(buyXgetYCoupon, selectedCartItemList);

      const priceList = selectedCartItemList.map(({ product }) => product.price);
      const maxPrice = Math.max(...priceList);

      expect(discountPrice).toBe(maxPrice);
    });
  });
});
