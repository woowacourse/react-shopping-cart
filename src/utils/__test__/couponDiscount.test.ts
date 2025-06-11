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

describe('쿠폰 최소 1개 최대 2개의 모든 경우의 수 조합 테스트', () => {
  it('쿠폰이 최소 1개 최대 2개까지 모든 경우의 수로 조합된다.', () => {
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

describe('1개 쿠폰이 적용된 경우 테스트', () => {
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

  it('5000원 할인 단독 쿠폰이 적용되면 5000원 할인된 금액을 반환한다.', () => {
    const result = simulateCombo(cartItems, combos[0], 50000, 3000);

    expect(result.totalDiscount).toEqual(5000);
    expect(result.breakdown).toEqual({
      FIXED5000: 45000,
    });
    expect(result.PriceWithDiscount).toEqual(45000);
    expect(result.finalShipping).toEqual(3000);
    expect(result.finalPayable).toEqual(48000);
  });

  it('2+1 쿠폰이 적용되면 결제할 상품 중 가장 높은 가격의 상품의 단품 가격만큼 할인된 금액을 반환한다.', () => {
    const result = simulateCombo(cartItems, combos[1], 50000, 3000);

    expect(result.totalDiscount).toEqual(10000);
    expect(result.breakdown).toEqual({
      BOGO: 40000,
    });
    expect(result.PriceWithDiscount).toEqual(40000);
    expect(result.finalShipping).toEqual(3000);
    expect(result.finalPayable).toEqual(43000);
  });

  it('무료 배송 단독 쿠폰이 적용되면 배송비가 무료가 된다.', () => {
    const result = simulateCombo(cartItems, combos[2], 50000, 3000);

    expect(result.totalDiscount).toEqual(0);
    expect(result.breakdown).toEqual({
      FREESHIPPING: 50000,
    });
    expect(result.PriceWithDiscount).toEqual(50000);
    expect(result.finalShipping).toEqual(0);
    expect(result.finalPayable).toEqual(50000);
  });

  it('미라클모닝 단독 쿠폰이 적용되면 30%만큼 할인된 금액을 반환한다.', () => {
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

  it('미라클모닝 쿠폰이 비활성화된 상태에서 FIXED5000 + 2+1 쿠폰 조합을 반환한다', () => {
    couponList.pop();
    const result = getBestCouponCombo(null, cartItems, couponList, 90000, 0);

    expect(result.totalDiscount).toEqual(25000);
    expect(result.breakdown).toEqual({ FIXED5000: 85000, BOGO: 65000 });
    expect(result.PriceWithDiscount).toEqual(65000);
    expect(result.finalShipping).toEqual(0);
    expect(result.finalPayable).toEqual(65000);
  });
});

it('사용 가능한 쿠폰 목록을 반환한다.', () => {
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

it('무료 배송 쿠폰이 있는지 확인한다.', () => {
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

it('무료 배송 쿠폰과 산간지역 배송에 따른 배송비를 계산한다.', () => {
  const result = calculateShippingFee(10000, false, false, 3000);

  expect(result).toEqual(10000);

  const result2 = calculateShippingFee(10000, false, true, 3000);

  expect(result2).toEqual(13000);

  const result3 = calculateShippingFee(10000, true, false, 3000);

  expect(result3).toEqual(0);

  const result4 = calculateShippingFee(10000, true, true, 3000);

  expect(result4).toEqual(0);
});

it('쿠폰과 배송비를 적용한 후의 최종 가격을 계산한다.', () => {
  const result = calculateFinalPrice(10000, 1000);

  expect(result).toEqual(11000);
});
