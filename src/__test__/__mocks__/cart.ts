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
    quantity: 12,
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
    quantity: 2,
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
    quantity: 2,
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
  1337: true,
};
