export type ProductId = Brand<Id, 'ProductId'>;

export interface Product {
  id: ProductId;
  name: string;
  price: KRW;
  imageUrl: Url;
  category: string;
}
