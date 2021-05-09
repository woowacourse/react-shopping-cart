export const PRODUCT_LIST_MOCK = [
  {
    id: '1',
    image: 'https://picsum.photos/200/200',
    name: 'test product name',
    price: 43400,
  },
  {
    id: '2',
    image: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    id: '3',
    image: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    id: '4',
    image: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
  {
    id: '5',
    image: 'https://picsum.photos/200/200',
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
  },
];

export const ORDER_LIST_MOCK = PRODUCT_LIST_MOCK.map((item) => ({
  ...item,
  amount: 2,
  quantity: 1,
  checked: false,
}));

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
