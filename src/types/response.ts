export type CategoryType = "전체" | "식료품" | "패션잡화";

export interface ProductItemType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  imageUrl: string;
}

export interface CartItemType {
  id: number;
  product: ProductItemType;
  quantity: number;
}

export type FetchResponseType = {
  cartItems: CartItemType[];
  cartItemsUpdate: void;
};

export type FetchKeyType = keyof FetchResponseType;
