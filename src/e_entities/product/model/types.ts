export type ProductId = Brand<Id, 'ProductId'>;

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
