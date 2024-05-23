export type OrderId = Brand<Id, 'OrderId'>;

export interface Product {
  id: OrderId;
  name: string;
  price: KRW;
  imageUrl: Url;
  category: string;
}
