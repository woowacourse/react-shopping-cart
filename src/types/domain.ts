export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: string;
}

export interface ProductWithChecked extends Product {
  isChecked: boolean;
}
