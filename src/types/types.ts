export interface CartInformation {
  id: number;
  quantity: number;
  product: ProductInformation;
}

export interface ProductInformation {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

