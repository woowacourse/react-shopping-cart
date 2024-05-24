import { Coupon } from "../types";

export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    discount: 5000,
    discountType: "fixed",
    minimumAmount: 100000,
    expirationDate: "2024-11-30",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    discountType: "buyXgetY",
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: "2024-09-30",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    discountType: "freeShipping",
    minimumAmount: 50000,
    expirationDate: "2024-08-31",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    discount: 30,
    discountType: "percentage",
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    expirationDate: "2024-07-31",
  },
];

export const mockCartItems = {
  content: [
    {
      id: 597,
      quantity: 1,
      product: {
        id: 11,
        name: "리복",
        price: 20000,
        imageUrl:
          "https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg",
        category: "fashion",
      },
    },
    {
      id: 598,
      quantity: 7,
      product: {
        id: 10,
        name: "퓨마",
        price: 10000,
        imageUrl:
          "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
        category: "fashion",
      },
    },
    {
      id: 599,
      quantity: 1,
      product: {
        id: 10,
        name: "퓨마",
        price: 10000,
        imageUrl:
          "https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg",
        category: "fashion",
      },
    },
  ],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: true,
  totalPages: 1,
  totalElements: 3,
  first: true,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  number: 0,
  numberOfElements: 3,
  size: 20,
  empty: false,
};
