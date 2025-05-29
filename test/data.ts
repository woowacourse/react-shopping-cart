import { CartItemType } from '../src/types/cartItem';

const mockData: CartItemType[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: '상품 이름 A',
      price: 10000,
      imageUrl: '',
      category: '패션잡화'
    },
    quantity: 3
  },
  {
    id: 2,
    product: {
      id: 1,
      name: '상품 이름 B',
      price: 15000,
      imageUrl: '',
      category: '식료품'
    },
    quantity: 2
  },
  {
    id: 3,
    product: {
      id: 103,
      name: '텀블러',
      price: 15000,
      imageUrl: '/images/tumbler.jpg',
      category: '생활용품'
    },
    quantity: 3
  }
];
export default mockData;
