export interface PayloadType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: string;
}

export interface CartItemType {
  id: number;
  quantity: string;
  product: ProductType;
}

export interface ProductListType extends Array<ProductType> {}

export interface CartItemListType extends Array<CartItemType> {}
