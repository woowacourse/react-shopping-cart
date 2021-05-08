export const PRODUCT_LIST_MOCK = [
  {
    imgSrc: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    imgSrc: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    imgSrc: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    imgSrc: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    imgSrc: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const ORDER_LIST_MOCK = PRODUCT_LIST_MOCK.map((item) => ({ ...item, amount: 2 }));

export const ORDERS_MOCK = [
  {
    id: '1',
    items: ORDER_LIST_MOCK,
  },
  {
    id: '2',
    items: ORDER_LIST_MOCK,
  },
];
