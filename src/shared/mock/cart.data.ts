import { CartResponse } from '@/features/Cart/types/Cart.types';

export const cartData: CartResponse = {
  content: [
    {
      id: 0,
      quantity: 1,
      product: {
        id: 19,
        name: '가죽자켓',
        price: 20000,
        imageUrl:
          'https://media.istockphoto.com/id/620004612/ko/%EC%82%AC%EC%A7%84/%EB%8F%84%EC%8B%9C%EC%97%90%EC%84%9C-%EB%82%A8%EC%84%B1-%EB%AA%A8%EB%8D%B8.webp?s=612x612&w=is&k=20&c=ZKGBpPehmS65ZXz3gzq5SZkiRsuJhCgDM5FpkVHONEw=',
        category: '패션잡화',
        quantity: 13,
      },
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 50,
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
  totalElements: 8,
  totalPages: 1,
  size: 50,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  first: true,
  numberOfElements: 8,
  empty: false,
};
