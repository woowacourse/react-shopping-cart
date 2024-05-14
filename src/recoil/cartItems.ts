import { atom } from 'recoil';

interface CartItemProps {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: [],
});
