const cartListMockData = {
  content: [
    {
      id: 597,
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
      id: 598,
      quantity: 7,
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
      id: 599,
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

export default cartListMockData;
