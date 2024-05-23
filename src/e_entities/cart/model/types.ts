export type CartId = Brand<Id, 'CartId'>;
export type ProductId = Brand<Id, 'ProductId'>;

export interface Cart {
  id: CartId;
  quantity: number;
  product: Product;
}

export interface Product {
  id: ProductId;
  name: string;
  price: KRW;
  imageUrl: Url;
  category: string;
}
