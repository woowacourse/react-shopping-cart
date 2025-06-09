import { Coupon, validatedCouponList } from '../../types/coupon';
import mockCoupon from '../../mocks/mockCoupon.json';
import {
  calculateShippingFee,
  generateCombos,
  getAvailableCoupons,
  hasFreeShippingCoupon,
  calculateFinalPrice,
  simulateCombo,
  getBestCouponCombo,
} from '../couponDiscount';
import { CartItemProps } from '../../types/cartItem';

describe('쿠폰 조합 테스트', () => {
  it('쿠폰 조합 테스트', () => {
    const couponList = mockCoupon as Coupon[];

    const result = generateCombos(couponList);

    const expected = [
      ...couponList.map((c) => [c]),
      ...couponList.flatMap((c1, i) =>
        couponList.filter((_, j) => i !== j).map((c2) => [c1, c2])
      ),
    ];

    expect(result).toEqual(expected);
  });
});

describe('단독 쿠폰 적용 테스트', () => {
  let combos: Coupon[][];
  let cartItems: CartItemProps[];
  beforeEach(() => {
    combos = generateCombos(mockCoupon as Coupon[]);
    cartItems = [
      {
        id: 1,
        quantity: 5,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
  });

  it('5000원 할인 단독 쿠폰 적용 테스트', () => {
    const result = simulateCombo(
      cartItems,
      combos[0], // 5000원 할인 쿠폰
      50000, // 총 가격
      3000 // 배송비
    );

    expect(result.totalDiscount).toEqual(5000);
    expect(result.breakdown).toEqual({
      FIXED5000: 45000,
    });
    expect(result.PriceWithDiscount).toEqual(45000);
    expect(result.finalShipping).toEqual(3000);
    expect(result.finalPayable).toEqual(48000);
  });

  it('2+1 쿠폰 단독 적용 테스트', () => {
    const result = simulateCombo(
      cartItems,
      combos[1], // 2+1 쿠폰
      50000, // 총 가격
      3000 // 배송비
    );

    expect(result.totalDiscount).toEqual(10000);
    expect(result.breakdown).toEqual({
      BOGO: 40000,
    });
    expect(result.PriceWithDiscount).toEqual(40000);
    expect(result.finalShipping).toEqual(3000);
    expect(result.finalPayable).toEqual(43000);
  });

  it('무료 배송 단독 쿠폰 적용 테스트', () => {
    const result = simulateCombo(cartItems, combos[2], 50000, 3000);

    expect(result.totalDiscount).toEqual(0);
    expect(result.breakdown).toEqual({
      FREESHIPPING: 50000,
    });
    expect(result.PriceWithDiscount).toEqual(50000);
    expect(result.finalShipping).toEqual(0);
    expect(result.finalPayable).toEqual(50000);
  });

  it('미라클모닝 단독 쿠폰 적용 테스트', () => {
    const result = simulateCombo(cartItems, combos[3], 50000, 3000);

    expect(result.totalDiscount).toEqual(15000);
    expect(result.breakdown).toEqual({
      MIRACLESALE: 35000,
    });
    expect(result.PriceWithDiscount).toEqual(35000);
    expect(result.finalShipping).toEqual(3000);
    expect(result.finalPayable).toEqual(38000);
  });
});

describe('할인률 가장 높은 쿠폰 적용 테스트', () => {
  let couponList: Coupon[];
  let cartItems: CartItemProps[];
  beforeEach(() => {
    couponList = mockCoupon as Coupon[];
    cartItems = [
      {
        id: 1,
        quantity: 5,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 2,
          name: '상품 1',
          price: 20000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];
  });
  it('cartItems에 대해 미라클모닝 + (2+1) 할인 쿠폰 조합 테스트 ', () => {
    const result = getBestCouponCombo(null, cartItems, couponList, 90000, 0);

    expect(result.totalDiscount).toEqual(47000);
    expect(result.breakdown).toEqual({ MIRACLESALE: 63000, BOGO: 43000 });
    expect(result.PriceWithDiscount).toEqual(43000);
    expect(result.finalShipping).toEqual(0);
    expect(result.finalPayable).toEqual(43000);
  });

  it('미라클모닝 쿠폰 비활성와 상태에서 cartItems에 대해 ', () => {
    couponList.pop();
    const result = getBestCouponCombo(null, cartItems, couponList, 90000, 0);

    expect(result.totalDiscount).toEqual(25000);
    expect(result.breakdown).toEqual({ FIXED5000: 85000, BOGO: 65000 });
    expect(result.PriceWithDiscount).toEqual(65000);
    expect(result.finalShipping).toEqual(0);
    expect(result.finalPayable).toEqual(65000);
  });
});

it('사용 가능 쿠폰 목록 테스트', () => {
  const couponList = [
    {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discount: 5000,
      discountType: 'fixed',
      expirationDate: '2025-06-01',
      isExpired: true,
    },
    {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      discountType: 'buyXgetY',
      expirationDate: '2025-07-01',
      isExpired: false,
    },
  ];
  const availableCoupons = [
    {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      discountType: 'buyXgetY',
      expirationDate: '2025-07-01',
      isExpired: false,
    },
  ];
  const result = getAvailableCoupons(couponList as validatedCouponList[]);

  expect(result).toEqual(availableCoupons);
});

it('무료 배송 쿠폰 테스트', () => {
  const couponList = [
    {
      id: 1,
      code: 'FREE_SHIPPING',
      description: '무료 배송 쿠폰',
      discountType: 'freeShipping',
      expirationDate: '2025-07-01',
      isExpired: false,
    },
  ];
  const result = hasFreeShippingCoupon(couponList as validatedCouponList[]);

  expect(result).toEqual(true);
});

it('배송비 계산 테스트', () => {
  const result = calculateShippingFee(10000, false, false, 3000);

  expect(result).toEqual(10000);

  const result2 = calculateShippingFee(10000, false, true, 3000);

  expect(result2).toEqual(13000);

  const result3 = calculateShippingFee(10000, true, false, 3000);

  expect(result3).toEqual(0);

  const result4 = calculateShippingFee(10000, true, true, 3000);

  expect(result4).toEqual(0);
});

it('최종 가격 계산 테스트', () => {
  const result = calculateFinalPrice(10000, 1000);

  expect(result).toEqual(11000);
});
