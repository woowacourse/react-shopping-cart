export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface OrderType {
  id: number;
  quantity: number;
  product: ProductType;
}

export interface CartType extends Array<OrderType> {}
