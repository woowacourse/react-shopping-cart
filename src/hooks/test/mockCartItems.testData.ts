import { CartItemType } from '../../type';

const mockCartItems: CartItemType[] = [
  {
    id: 1,
    quantity: 1,
    product: {
      id: 1,
      name: 'nike',
      price: 10000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 2,
    quantity: 2,
    product: {
      id: 2,
      name: 'adidas',
      price: 20000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 3,
      name: 'reebok',
      price: 30000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 4,
    quantity: 4,
    product: {
      id: 4,
      name: 'puma',
      price: 40000,
      imageUrl: '',
      category: 'fashion',
    },
  },
  {
    id: 5,
    quantity: 5,
    product: {
      id: 5,
      name: 'coke',
      price: 50000,
      imageUrl: '',
      category: 'fashion',
    },
  },
];

export default mockCartItems;
