export const mockChecked = { 9084: true };

export const mockProductAmount100_000 = [
  {
    id: 9084,
    quantity: 8,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

export const mockProductAmount10_000 = [
  {
    id: 9084,
    quantity: 1,
    product: {
      id: 11,
      name: '리복',
      price: 10000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

export const mockProductQuantity1 = [
  {
    id: 9084,
    quantity: 1,
    product: {
      id: 11,
      name: '리복',
      price: 10000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

export const mockProductQuantity3 = [
  {
    id: 9084,
    quantity: 3,
    product: {
      id: 11,
      name: '리복',
      price: 10000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

export const mockFIXED5000 = {
  id: 1,
  code: 'FIXED5000',
  description: '5,000원 할인 쿠폰',
  expirationDate: '2024-11-30',
  discount: 5000,
  minimumAmount: 100000,
  discountType: 'fixed',
};

export const mockBOGO = {
  id: 2,
  code: 'BOGO',
  description: '2개 구매 시 1개 무료 쿠폰',
  expirationDate: '2024-05-30',
  buyQuantity: 2,
  getQuantity: 1,
  discountType: 'buyXgetY',
};

export const mockFREESHIPPING = {
  id: 3,
  code: 'FREESHIPPING',
  description: '5만원 이상 구매 시 무료 배송 쿠폰',
  expirationDate: '2024-08-31',
  minimumAmount: 50000,
  discountType: 'freeShipping',
};

export const mockMIRACLESALE = {
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
};

export const mockCoupons = [mockFIXED5000, mockBOGO, mockFREESHIPPING, mockMIRACLESALE];
