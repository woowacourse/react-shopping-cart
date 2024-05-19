const cartListMockData = {
  content: [
    {
      id: 1029,
      quantity: 1,
      product: {
        id: 11,
        name: '리복',
        price: 20000,
        imageUrl:
          'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
        category: 'fashion',
      },
    },
    {
      id: 1030,
      quantity: 3,
      product: {
        id: 12,
        name: '컨버스',
        price: 20000,
        imageUrl:
          'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
        category: 'fashion',
      },
    },
    {
      id: 1123,
      quantity: 1,
      product: {
        id: 3,
        name: '아디다스',
        price: 100000,
        imageUrl:
          'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
        category: 'fashion',
      },
    },
    {
      id: 1124,
      quantity: 1,
      product: {
        id: 10,
        name: '퓨마',
        price: 10000,
        imageUrl:
          'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
        category: 'fashion',
      },
    },
    {
      id: 1125,
      quantity: 1,
      product: {
        id: 12,
        name: '컨버스',
        price: 20000,
        imageUrl:
          'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
        category: 'fashion',
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
  totalElements: 5,
  first: true,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  number: 0,
  numberOfElements: 5,
  size: 20,
  empty: false,
};

export default cartListMockData;
