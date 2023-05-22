export interface CartInformation {
  id: number;
  quantity: number;
  product: ProductInformation;
  isSelect?: boolean;
}

export interface ProductInformation {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
