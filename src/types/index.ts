export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}
