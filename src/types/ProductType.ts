export interface ProductItemType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
  checked?: boolean;
  product: ProductItemType;
}
export interface NewCartItemType extends CartItemType {
  quantity: 1;
}
