export interface CartInformation {
  id: number;
  quantity: number;
  product: ProductInformation;
}

export interface CartAndSelectInformation extends CartInformation {
  isSelected: boolean;
}

export interface ProductInformation {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
