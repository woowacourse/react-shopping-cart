export interface CartType {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  price: number;
  name: string;
  imageUrl?: string;
}
