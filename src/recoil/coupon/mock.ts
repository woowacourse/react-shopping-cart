export const COUPON_LIST_STATE_TEST_CASES: TEST_ITEM_PROP<Coupon[]>[] = [
  { input: [], expected: [] },
  {
    input: [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        expirationDate: '2024-11-30',
        discount: 5000,
        minimumAmount: 0,
        discountType: 'fixed' as DiscountType,
      },
    ],
    expected: [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        expirationDate: '2024-11-30',
        discount: 5000,
        minimumAmount: 0,
        discountType: 'fixed' as DiscountType,
      },
    ],
  },
  {
    input: [
      {
        id: 2,
        code: 'BOGO',
        description: '2개 구매 시 1개 무료 쿠폰',
        expirationDate: '2024-05-30',
        buyQuantity: 2,
        getQuantity: 1,
        discountType: 'buyXgetY' as DiscountType,
      },
      {
        id: 3,
        code: 'FREESHIPPING',
        description: '5만원 이상 구매 시 무료 배송 쿠폰',
        expirationDate: '2024-08-31',
        minimumAmount: 50000,
        discountType: 'freeShipping' as DiscountType,
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
        discountType: 'percentage' as DiscountType,
      },
    ],
    expected: [
      {
        id: 2,
        code: 'BOGO',
        description: '2개 구매 시 1개 무료 쿠폰',
        expirationDate: '2024-05-30',
        buyQuantity: 2,
        getQuantity: 1,
        discountType: 'buyXgetY' as DiscountType,
      },
      {
        id: 3,
        code: 'FREESHIPPING',
        description: '5만원 이상 구매 시 무료 배송 쿠폰',
        expirationDate: '2024-08-31',
        minimumAmount: 50000,
        discountType: 'freeShipping' as DiscountType,
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
        discountType: 'percentage' as DiscountType,
      },
    ],
  },
];

export const SELECTED_COUPON_LIST_STATE_TEST_CASES = [
  { input: [], expected: [] },
  {
    input: [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        expirationDate: '2024-11-30',
        discount: 5000,
        minimumAmount: 0,
        discountType: 'fixed' as DiscountType,
      },
    ],
    expected: [
      {
        id: 1,
        code: 'FIXED5000',
        description: '5,000원 할인 쿠폰',
        expirationDate: '2024-11-30',
        discount: 5000,
        minimumAmount: 0,
        discountType: 'fixed' as DiscountType,
      },
    ],
  },
  {
    input: [
      {
        id: 2,
        code: 'BOGO',
        description: '2개 구매 시 1개 무료 쿠폰',
        expirationDate: '2024-05-30',
        buyQuantity: 2,
        getQuantity: 1,
        discountType: 'buyXgetY' as DiscountType,
      },
      {
        id: 3,
        code: 'FREESHIPPING',
        description: '5만원 이상 구매 시 무료 배송 쿠폰',
        expirationDate: '2024-08-31',
        minimumAmount: 50000,
        discountType: 'freeShipping' as DiscountType,
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
        discountType: 'percentage' as DiscountType,
      },
    ],
    expected: [
      {
        id: 2,
        code: 'BOGO',
        description: '2개 구매 시 1개 무료 쿠폰',
        expirationDate: '2024-05-30',
        buyQuantity: 2,
        getQuantity: 1,
        discountType: 'buyXgetY' as DiscountType,
      },
      {
        id: 3,
        code: 'FREESHIPPING',
        description: '5만원 이상 구매 시 무료 배송 쿠폰',
        expirationDate: '2024-08-31',
        minimumAmount: 50000,
        discountType: 'freeShipping' as DiscountType,
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
        discountType: 'percentage' as DiscountType,
      },
    ],
  },
];
