import { GetCartItemsResponse } from "@/types";

export const CART_ITEMS_DATA: GetCartItemsResponse = {
  content: [
    {
      id: 2679,
      quantity: 1,
      product: {
        id: 24,
        name: "부리부리 원형 테이블",
        price: 3210000,
        imageUrl:
          "https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg",
        category: "패션잡화",
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
