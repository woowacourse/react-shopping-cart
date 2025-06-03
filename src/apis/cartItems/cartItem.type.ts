interface ProductItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
}

export interface OrderItemType {
  id: number;
  isChecked: boolean;
}

export interface UpdateCartItemQuantity {
  id: number;
  quantity: number;
}
