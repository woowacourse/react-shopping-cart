export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}
