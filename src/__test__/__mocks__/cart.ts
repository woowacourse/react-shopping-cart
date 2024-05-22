import { CartItem } from "@/types/cartItem";

export const MOCK_CART_LIST: CartItem[] = [
  {
    id: 1274,
    quantity: 7,
    product: {
      id: 2,
      name: "나이키",
      price: 1000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
  },
  {
    id: 1334,
    quantity: 1,
    product: {
      id: 2,
      name: "나이키",
      price: 1000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
  },
  {
    id: 1335,
    quantity: 1,
    product: {
      id: 3,
      name: "아디다스",
      price: 2000,
      imageUrl:
        "https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg",
      category: "fashion",
    },
  },
  {
    id: 1336,
    quantity: 1,
    product: {
      id: 21,
      name: "나이키",
      price: 20000,
      imageUrl:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
      category: "fashion",
    },
  },
  {
    id: 1337,
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
];

export const MOCK_CART_ITEM_SELECTIONS: { [key: string]: boolean } = {
  1274: true,
  1334: false,
  1335: true,
  1336: true,
  1337: false,
};

export const MOCK_CART_COUPONS = [
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
