import { CartItem } from "@/types/cart";

export const mockCartItemList: CartItem[] = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 1,
      name: "나이키",
      price: 1000,
      imageUrl: "",
      category: "fashion",
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      name: "퓨마",
      price: 500,
      imageUrl: "",
      category: "fashion",
    },
  },
  {
    id: 3,
    quantity: 1,
    product: {
      id: 3,
      name: "아디다스",
      price: 100000,
      imageUrl: "",
      category: "fashion",
    },
  },
];
