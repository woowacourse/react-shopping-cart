export interface CartItemContent {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}
