export interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
}

export interface CartProduct {
  id: string;
  quantity: number;
  product: Product;
}
