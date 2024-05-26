export const MOCK_CART_ITEM = [
  {
    id: 111,
    quantity: 1,
    product: {
      id: 1,
      name: 'Product 1',
      price: 100000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 222,
    quantity: 2,
    product: {
      id: 2,
      name: 'Product 2',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

export const MOCK_ORDER_LIST: Cart[] = [
  {
    id: 111,
    quantity: 1,
    product: {
      id: 1,
      name: 'Product 1',
      price: 100000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 222,
    quantity: 2,
    product: {
      id: 2,
      name: 'Product 2',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },

  {
    id: 333,
    quantity: 3,
    product: {
      id: 3,
      name: 'Product 3',
      price: 10000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

export const MOCK_ORDER_TOTAL_PRICE: number = MOCK_ORDER_LIST.reduce(
  (acc, cur) => acc + cur.product.price * cur.quantity,
  0,
);

export const MOCK_COUPON_LIST: Coupon[] = [
  {
    id: 1,
    code: 'FIXED5000',
    description: '5,000원 할인 쿠폰',
    expirationDate: '2024-11-30',
    discount: 5000,
    minimumAmount: 100000,
    discountType: 'fixed',
  },
  {
    id: 2,
    code: 'BOGO',
    description: '2개 구매 시 1개 무료 쿠폰',
    expirationDate: '2024-04-30',
    buyQuantity: 2,
    getQuantity: 1,
    discountType: 'buyXgetY',
  },
  {
    id: 3,
    code: 'FREESHIPPING',
    description: '5만원 이상 구매 시 무료 배송 쿠폰',
    expirationDate: '2024-08-31',
    minimumAmount: 50000,
    discountType: 'freeShipping',
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
    discountType: 'percentage',
  },
];
