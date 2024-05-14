export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface Products {
  id: number;
  quantity: number;
  product: Product;
}
