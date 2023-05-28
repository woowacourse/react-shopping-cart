export interface PayloadType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductType extends PayloadType {
  quantity: number;
}

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface ProductListType extends Array<ProductType> {}

export interface CartItemListType extends Array<CartItemType> {}
