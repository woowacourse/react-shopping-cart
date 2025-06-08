import { COUPON_DATA } from '../../mock/couponData';
import { Content } from '../../types/cartItems';
import { canAdjustCoupon } from '../../utils/couponService';
import { calculateDiscountAndTotalPrice } from '../../utils/orderCalculate';

describe('쿠폰 적용 가능 여부 판단 - canAdjustCoupon', () => {
  const selectedItems: Content[] = [
    {
      id: 101,
      product: {
        id: 1,
        name: '상품명1',
        imageUrl: 'http://example.com/image1.jpg',
        category: '카테고리1',
        price: 10000,
      },
      quantity: 3,
    },
    {
      id: 102,
      product: {
        id: 2,
        name: '상품명2',
        imageUrl: 'http://example.com/image2.jpg',
        category: '카테고리2',
        price: 20000,
      },
      quantity: 1,
    },
  ];

  describe('FIXED5000 쿠폰', () => {
    it('총 주문 금액이 minimumAmount 이상이면 적용 가능', () => {
      expect(canAdjustCoupon({ coupon: COUPON_DATA[0], orderPrice: 100000, selectedItems })).toBe(true);
    });

    it('총 주문 금액이 minimumAmount 미만이면 적용 불가', () => {
      expect(canAdjustCoupon({ coupon: COUPON_DATA[0], orderPrice: 90000, selectedItems })).toBe(false);
    });
  });

  describe('BOGO 쿠폰', () => {
    it('한 제품을 buyQuantity 이상 구매하면 적용 가능', () => {
      expect(canAdjustCoupon({ coupon: COUPON_DATA[1], orderPrice: 0, selectedItems })).toBe(true);
    });
  });

  describe('FREESHIPPING 쿠폰', () => {
    it('총 주문 금액이 minimumAmount 이상이면 적용 가능', () => {
      expect(canAdjustCoupon({ coupon: COUPON_DATA[2], orderPrice: 50000, selectedItems })).toBe(true);
    });

    it('총 주문 금액이 minimumAmount 미만이면 적용 불가', () => {
      expect(canAdjustCoupon({ coupon: COUPON_DATA[2], orderPrice: 49000, selectedItems })).toBe(false);
    });
  });

  describe('MIRACLESALE 쿠폰', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('현재 시간이 사용 가능 시간대면 적용 가능', () => {
      jest.setSystemTime(new Date('2025-06-01T05:00:00'));
      expect(canAdjustCoupon({ coupon: COUPON_DATA[3], orderPrice: 0, selectedItems })).toBe(true);
    });

    it('현재 시간이 사용 가능 시간대가 아니면 적용 불가', () => {
      jest.setSystemTime(new Date('2025-06-01T08:00:00'));
      expect(canAdjustCoupon({ coupon: COUPON_DATA[3], orderPrice: 0, selectedItems })).toBe(false);
    });
  });
});

describe('calculateDiscountAndTotalPrice', () => {
  const shippingFee = 3000;

  const selectedItems: Content[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: '상품1',
        imageUrl: '',
        category: '카테고리',
        price: 10000,
      },
      quantity: 3,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: '상품2',
        imageUrl: '',
        category: '카테고리',
        price: 30000,
      },
      quantity: 2,
    },
  ];

  const orderPrice = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  describe('FIXED5000 쿠폰', () => {
    it('5,000원의 할인 금액을 반환한다.', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[0]],
        selectedItems,
        orderPrice,
        shippingFee
      );
      expect(totalDiscount).toBe(5000);
    });
  });

  describe('BOGO 쿠폰', () => {
    it('2개 이상 구매한 제품 중 가장 비싼 가격을 할인한다.', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[1]],
        selectedItems,
        orderPrice,
        shippingFee
      );
      expect(totalDiscount).toBe(30000);
    });
  });

  describe('FREESHIPPING 쿠폰', () => {
    it('제주도/도서산간이 아닌 경우 배송비 3,000원을 할인한다.', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[2]],
        selectedItems,
        orderPrice,
        shippingFee
      );
      expect(totalDiscount).toBe(3000);
    });

    it('배송비가 6,000원이라면 그만큼 할인한다.', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[2]],
        selectedItems,
        orderPrice,
        6000 // 제주도라 가정
      );
      expect(totalDiscount).toBe(6000);
    });
  });

  describe('MIRACLESALE 쿠폰', () => {
    it('30%의 할인 금액을 반환한다.', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[3]],
        selectedItems,
        orderPrice,
        shippingFee
      );
      const expected = Math.floor(orderPrice * 0.3);
      expect(totalDiscount).toBe(expected);
    });
  });

  describe('복수 쿠폰 적용', () => {
    it('미라클세일 + 고정 할인 + 배송비 쿠폰 모두 적용 시 올바른 총 할인 반환', () => {
      const { totalDiscount } = calculateDiscountAndTotalPrice(
        [COUPON_DATA[3], COUPON_DATA[0], COUPON_DATA[2]],
        selectedItems,
        orderPrice,
        shippingFee
      );
      const expected = Math.floor(orderPrice * 0.3) + 5000 + shippingFee;
      expect(totalDiscount).toBe(expected);
    });
  });
});
