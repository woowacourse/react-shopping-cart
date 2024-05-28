export const SELECTED_CART_ITEM_ID_STATE_TEST_CASES: TEST_ITEM_PROP<
  number[]
>[] = [
  {
    input: [1, 2, 3, 4],
    expected: [1, 2, 3, 4],
  },
  {
    input: [10],
    expected: [10],
  },
  {
    input: [],
    expected: [],
  },
];

export const CART_ITEM_LIST_STATE_TEST_CASES: TEST_ITEM_PROP<CartItem[]>[] = [
  {
    input: [
      {
        id: 2426,
        quantity: 1,
        name: '컨버스',
        price: 20000,
        imageUrl:
          'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      },
      {
        id: 2427,
        quantity: 1,
        name: '코카콜라',
        price: 10000,
        imageUrl:
          'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
      },
    ],
    expected: [
      {
        id: 2426,
        quantity: 1,
        name: '컨버스',
        price: 20000,
        imageUrl:
          'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
      },
      {
        id: 2427,
        quantity: 1,
        name: '코카콜라',
        price: 10000,
        imageUrl:
          'https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg',
      },
    ],
  },
  {
    input: [
      {
        id: 2421,
        quantity: 1,
        name: '나이키',
        price: 1000,
        imageUrl:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      },
    ],
    expected: [
      {
        id: 2421,
        quantity: 1,
        name: '나이키',
        price: 1000,
        imageUrl:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      },
    ],
  },
  {
    input: [],
    expected: [],
  },
];

export const HAS_EXTRA_DELIVERY_FEE_STATE_TEST_CASES: TEST_ITEM_PROP<boolean>[] =
  [
    {
      input: false,
      expected: false,
    },
    {
      input: true,
      expected: true,
    },
  ];
