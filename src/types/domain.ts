export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartProduct extends Product {
  quantity: number;
  isChecked: boolean;
}
