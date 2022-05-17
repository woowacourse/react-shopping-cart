export interface ProductInfo {
  name: string;
  image: string;
  price: number;
}

export interface Product extends ProductInfo {
  id: number;
}

export interface CartItem extends ProductInfo {
  id: string;
  user: string;
  checked?: boolean;
  quantity: number;
}

export type CheckedIdList = string[];

export type Carts = CartItem[];
