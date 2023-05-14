export interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface newCartProduct {
  id: number;
  quantity: 1;
  product: ProductItem;
}
