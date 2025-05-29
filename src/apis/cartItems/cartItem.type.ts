type ProductItemType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductItemType;
};

export type UpdateCartItemQuantity = {
  id: number;
  quantity: number;
};
