export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export type CheckedStates = Pick<CartItem, 'id'> & { isChecked: boolean };

export type Sign = 'minus' | 'plus';
