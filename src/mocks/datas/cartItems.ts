import { GetCartItemsResponse } from "@/types";

export const CART_ITEMS_DATA: GetCartItemsResponse = {
  content: [
    {
      id: 2679,
      quantity: 1,
      product: {
        id: 24,
        name: "스파이더맨",
        price: 80000,
        imageUrl: "/images/spiderman.png",
        category: "굿즈",
        stock: 10,
      },
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalElements: 7,
  totalPages: 1,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 7,
  empty: false,
};
