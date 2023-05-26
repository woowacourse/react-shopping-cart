export interface ServerCartInformation {
  id: number;
  quantity: number;
  product: ProductInformation;
}

export interface CartInformation extends ServerCartInformation {
  isSelect: boolean;
}

export interface ProductInformation {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
