export const freeShippingDummy: { content: CartItemInfo[] } = {
  content: [
    {
      id: 1,
      product: {
        id: 100,
        name: "퓨마",
        price: 20000,
        imageUrl: "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
        category: "fashion",
      },
      quantity: 4,
    },
    {
      id: 2,
      product: {
        id: 101,
        name: "아디다스",
        price: 10000,
        imageUrl: "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
        category: "fashion",
      },
      quantity: 2,
    },
    {
      id: 3,
      product: {
        id: 104,
        name: "아디다스",
        price: 10000,
        imageUrl: "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
        category: "fashion",
      },
      quantity: 2,
    },
  ],
};

export const chargeShippingDummy: { content: CartItemInfo[] } = {
  content: [
    {
      id: 1,
      product: {
        id: 100,
        name: "abc",
        price: 20000,
        imageUrl: "",
        category: "fashion",
      },
      quantity: 1,
    },
    {
      id: 2,
      product: {
        id: 101,
        name: "def",
        price: 10000,
        imageUrl: "",
        category: "fashion",
      },
      quantity: 2,
    },
  ],
};

export const couponsDummy = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-04-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];
