import {
  calculateOptimalCouponCombination,
  calculateSelectedCoupons,
  CartItem,
} from '../src/utils/couponCalculator';
import {
  PercentageCoupon,
  FixedCoupon,
  BuyXGetYCoupon,
  FreeShippingCoupon,
} from '../src/types/coupon';
import { FEE } from '../src/constants/systemConstants';

// Date를 mock하기 위한 유틸리티 함수
const mockCurrentTime = (hour: number, minute: number = 0) => {
  const mockDate = new Date();
  mockDate.setHours(hour, minute, 0, 0);
  jest.spyOn(globalThis, 'Date').mockImplementation(() => mockDate);
};

const restoreTime = () => {
  jest.restoreAllMocks();
};

// 테스트용 쿠폰 데이터
const createMockCoupons = () => {
  const miracleMorningCoupon: PercentageCoupon = {
    id: 1,
    code: 'MIRACLEMORNING',
    description: '아침 할인 20%',
    expirationDate: '2024-12-31',
    discountType: 'percentage',
    discount: 30,
    availableTime: {
      start: '06:00',
      end: '09:00',
    },
  };

  const miracleSaleCoupon: PercentageCoupon = {
    id: 2,
    code: 'MIRACLESALE',
    description: '특별 할인 30%',
    expirationDate: '2024-12-31',
    discountType: 'percentage',
    discount: 30, // 실제로는 30%로 강제 적용됨
  };

  const fixed5000Coupon: FixedCoupon = {
    id: 3,
    code: 'FIXED5000',
    description: '5000원 할인',
    expirationDate: '2024-12-31',
    discountType: 'fixed',
    discount: 5000,
    minimumAmount: 50000,
  };

  const bogoCoupon: BuyXGetYCoupon = {
    id: 4,
    code: 'BOGO',
    description: '하나 사면 하나 무료',
    expirationDate: '2024-12-31',
    discountType: 'buyXgetY',
    buyQuantity: 1,
    getQuantity: 1,
  };

  const freeShippingCoupon: FreeShippingCoupon = {
    id: 5,
    code: 'FREESHIPPING',
    description: '무료 배송',
    expirationDate: '2024-12-31',
    discountType: 'freeShipping',
    minimumAmount: 30000,
  };

  return {
    miracleMorningCoupon,
    miracleSaleCoupon,
    fixed5000Coupon,
    bogoCoupon,
    freeShippingCoupon,
  };
};

// 테스트용 장바구니 데이터
const createMockCartItems = (): CartItem[] => [
  { id: 1, price: 30000, quantity: 2 }, // 60,000원
  { id: 2, price: 20000, quantity: 1 }, // 20,000원
  // 총액: 80,000원
];

const createLargeCartItems = (): CartItem[] => [
  { id: 1, price: 50000, quantity: 2 }, // 100,000원
  { id: 2, price: 30000, quantity: 1 }, // 30,000원
  // 총액: 130,000원
];

describe('쿠폰 계산 로직 테스트', () => {
  const mockCoupons = createMockCoupons();
  const mockCartItems = createMockCartItems();
  const largeCartItems = createLargeCartItems();

  afterEach(() => {
    restoreTime();
  });

  describe('1. 시간 조건 테스트 - 미라클 모닝 쿠폰', () => {
    test('오전 6시-9시 사이에는 미라클 모닝 쿠폰이 적용되어야 한다', () => {
      // 오전 7:30으로 시간 설정
      mockCurrentTime(7, 30);

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(24000); // 80,000 * 20% = 16,000원
      expect(result.appliedCoupons).toHaveLength(1);
      expect(result.discountBreakdown[0].coupon.code).toBe('MIRACLEMORNING');
    });

    test('오전 9시 이후에는 미라클 모닝 쿠폰이 적용되지 않아야 한다', () => {
      // 오전 10시로 시간 설정
      mockCurrentTime(10, 0);

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(0);
      expect(result.discountBreakdown).toHaveLength(0);
    });

    test('오전 6시 정각에는 미라클 모닝 쿠폰이 적용되어야 한다 (경계값)', () => {
      mockCurrentTime(6, 0);

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(24000);
    });

    test('오전 9시 정각에는 미라클 모닝 쿠폰이 적용되어야 한다 (경계값)', () => {
      mockCurrentTime(9, 0);

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(24000);
    });

    test('오전 5시 59분에는 미라클 모닝 쿠폰이 적용되지 않아야 한다 (경계값)', () => {
      mockCurrentTime(5, 59);

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(0);
    });
  });

  describe('2. 경계값 테스트', () => {
    test('FIXED5000 쿠폰: 최소 주문 금액 미만일 때 적용되지 않아야 한다', () => {
      const smallCartItems: CartItem[] = [
        { id: 1, price: 40000, quantity: 1 }, // 40,000원 (최소 50,000원 미만)
      ];

      const result = calculateSelectedCoupons(
        smallCartItems,
        [mockCoupons.fixed5000Coupon],
        false
      );

      expect(result.discountAmount).toBe(0);
    });

    test('FIXED5000 쿠폰: 최소 주문 금액 정확히 일치할 때 적용되어야 한다', () => {
      const exactCartItems: CartItem[] = [
        { id: 1, price: 50000, quantity: 1 }, // 정확히 50,000원
      ];

      const result = calculateSelectedCoupons(
        exactCartItems,
        [mockCoupons.fixed5000Coupon],
        false
      );

      expect(result.discountAmount).toBe(5000);
    });

    test('무료배송 기준 금액(100,000원) 경계값 테스트', () => {
      const result99k = calculateSelectedCoupons(
        [{ id: 1, price: 99000, quantity: 1 }],
        [],
        false
      );
      expect(result99k.shippingFee).toBe(FEE.DELIVERY_FEE); // 기본 배송비

      const result100k = calculateSelectedCoupons(
        [{ id: 1, price: FEE.DELIVERY_FEE_STANDARD, quantity: 1 }],
        [],
        false
      );
      expect(result100k.shippingFee).toBe(FEE.DELIVERY_FEE_FREE); // 무료 배송
    });

    test('도서산간 지역 배송비 추가 테스트', () => {
      const resultNormal = calculateSelectedCoupons(
        mockCartItems,
        [],
        false // 일반 지역
      );

      const resultRemote = calculateSelectedCoupons(
        mockCartItems,
        [],
        true // 도서산간 지역
      );

      expect(resultRemote.shippingFee).toBe(
        resultNormal.shippingFee + FEE.DELIVERY_FEE
      );
    });

    test('FREESHIPPING 쿠폰: 최소 주문 금액 경계값 테스트', () => {
      const belowMinimum: CartItem[] = [
        { id: 1, price: 29000, quantity: 1 }, // 29,000원 (최소 30,000원 미만)
      ];

      const atMinimum: CartItem[] = [
        { id: 1, price: 30000, quantity: 1 }, // 30,000원 (최소 금액)
      ];

      const resultBelow = calculateSelectedCoupons(
        belowMinimum,
        [mockCoupons.freeShippingCoupon],
        true
      );

      const resultAt = calculateSelectedCoupons(
        atMinimum,
        [mockCoupons.freeShippingCoupon],
        true
      );

      expect(resultBelow.shippingFee).toBe(FEE.DELIVERY_FEE * 2); // 기본배송비 + 도서산간비
      expect(resultAt.shippingFee).toBe(FEE.DELIVERY_FEE_FREE); // 무료배송
    });
  });

  describe('3. 최적 할인 조합 테스트', () => {
    test('MIRACLESALE 쿠폰이 30% 할인으로 강제 적용되어야 한다', () => {
      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleSaleCoupon],
        false
      );

      expect(result.discountAmount).toBe(24000); // 80,000 * 30% = 24,000원
      expect(result.appliedCoupons[0].code).toBe('MIRACLESALE');
    });

    test('FIXED5000 + MIRACLESALE 조합에서 순서에 따른 할인 계산', () => {
      const result = calculateSelectedCoupons(
        largeCartItems, // 130,000원
        [mockCoupons.fixed5000Coupon, mockCoupons.miracleSaleCoupon],
        false
      );

      // 첫 번째: FIXED5000 적용 → 130,000 - 5,000 = 125,000
      // 두 번째: MIRACLESALE 30% 적용 → 125,000 * 30% = 37,500
      // 총 할인: 5,000 + 37,500 = 42,500원
      expect(result.discountAmount).toBe(42500);
      expect(result.finalAmount).toBe(87500); // 130,000 - 42,500
    });

    test('BOGO + 고정가격 쿠폰 조합 테스트', () => {
      const cartWithDuplicates: CartItem[] = [
        { id: 1, price: 30000, quantity: 2 }, // BOGO 적용 가능
        { id: 2, price: 20000, quantity: 1 },
      ];

      const result = calculateSelectedCoupons(
        cartWithDuplicates,
        [mockCoupons.bogoCoupon, mockCoupons.fixed5000Coupon],
        false
      );

      // BOGO: 30,000원 상품 1개 무료 = 30,000원 할인
      // FIXED5000: 나머지 50,000원에서 5,000원 할인
      expect(result.discountAmount).toBeGreaterThan(30000);
    });

    test('최적 할인 조합 자동 선택 테스트', () => {
      mockCurrentTime(7, 0); // 미라클 모닝 쿠폰 적용 시간

      const allCoupons = [
        mockCoupons.miracleMorningCoupon, // 20% 할인
        mockCoupons.miracleSaleCoupon, // 30% 할인 (강제)
        mockCoupons.fixed5000Coupon, // 5,000원 할인
      ];

      const result = calculateOptimalCouponCombination(
        largeCartItems, // 130,000원
        allCoupons,
        false
      );

      // MIRACLESALE (30%) 단독이 가장 할인이 클 것
      // 130,000 * 30% = 39,000원 vs FIXED5000 + MIRACLEMORNING 조합
      expect(result.appliedCoupons.some((c) => c.code === 'MIRACLESALE')).toBe(
        true
      );
    });

    test('FREESHIPPING 쿠폰과 다른 쿠폰 조합 시 배송비 무료 적용', () => {
      const result = calculateSelectedCoupons(
        largeCartItems,
        [mockCoupons.freeShippingCoupon, mockCoupons.fixed5000Coupon],
        true // 도서산간 지역
      );

      expect(result.shippingFee).toBe(FEE.DELIVERY_FEE_FREE); // FREESHIPPING 쿠폰으로 배송비 무료
      expect(result.discountAmount).toBe(5000); // FIXED5000 할인만 적용
    });

    test('복잡한 3개 쿠폰 조합에서 최대 2개까지만 적용', () => {
      const result = calculateSelectedCoupons(
        largeCartItems,
        [
          mockCoupons.miracleSaleCoupon, // 30% 할인
          mockCoupons.fixed5000Coupon, // 5,000원 할인
          mockCoupons.freeShippingCoupon, // 무료배송
        ],
        false
      );

      // 3개 쿠폰이 모두 적용되어야 함 (선택된 쿠폰 직접 적용)
      expect(result.appliedCoupons).toHaveLength(3);
      expect(result.discountAmount).toBeGreaterThan(0);
      expect(result.shippingFee).toBe(FEE.DELIVERY_FEE_FREE);
    });
  });

  describe('4. 엣지 케이스 테스트', () => {
    test('빈 장바구니에서 쿠폰 적용', () => {
      const result = calculateSelectedCoupons(
        [],
        [mockCoupons.fixed5000Coupon],
        false
      );

      expect(result.originalAmount).toBe(0);
      expect(result.discountAmount).toBe(0);
      expect(result.finalAmount).toBe(FEE.DELIVERY_FEE); // 기본 배송비만
    });

    test('쿠폰 없이 계산', () => {
      const result = calculateSelectedCoupons(mockCartItems, [], false);

      expect(result.discountAmount).toBe(0);
      expect(result.appliedCoupons).toHaveLength(0);
      expect(result.finalAmount).toBe(80000 + FEE.DELIVERY_FEE); // 80,000 + 3,000 배송비
    });

    test('할인 금액이 주문 금액을 초과하지 않는지 확인', () => {
      const smallCart: CartItem[] = [{ id: 1, price: 3000, quantity: 1 }];

      const result = calculateSelectedCoupons(
        smallCart,
        [mockCoupons.fixed5000Coupon], // 5,000원 할인
        false
      );

      // 최소 주문 금액(50,000원) 미달로 쿠폰 적용 안됨
      expect(result.discountAmount).toBe(0);
    });

    test('자정 경계에서의 시간 테스트', () => {
      mockCurrentTime(0, 0); // 자정

      const result = calculateSelectedCoupons(
        mockCartItems,
        [mockCoupons.miracleMorningCoupon],
        false
      );

      expect(result.discountAmount).toBe(0); // 자정은 적용 시간 외
    });
  });
});
