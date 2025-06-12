export const mockCartData = [
  {
    id: 1,
    product: {
      id: 3,
      name: "조던 1 시카고",
      price: 33000,
      imageUrl: "/images/jordan1-chicago.jpg",
      category: "패션잡화",
      quantity: 12,
    },
    quantity: 2,
  },
  {
    id: 2,
    product: {
      id: 5,
      name: "덩크 로우 판다",
      price: 24000,
      imageUrl: "/images/dunk-panda.jpg",
      category: "패션잡화",
      quantity: 33,
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      id: 10,
      name: "페가수스 40",
      price: 140000,
      imageUrl: "/images/pegasus.jpg",
      category: "식료품",
      quantity: 20,
    },
    quantity: 3,
  },
  {
    id: 4,
    product: {
      id: 15,
      name: "코르테즈 클래식",
      price: 95000,
      imageUrl: "/images/cortez.jpg",
      category: "패션잡화",
      quantity: 48,
    },
    quantity: 1,
  },
  {
    id: 5,
    product: {
      id: 18,
      name: "에어포스 커스텀",
      price: 120000,
      imageUrl: "/images/airforce-custom.jpg",
      category: "패션잡화",
      quantity: 5,
    },
    quantity: 2,
  },
];

export const mockCouponData = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];
