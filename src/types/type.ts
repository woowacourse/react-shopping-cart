export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  isSelected: boolean;
}

type Category = "패션잡화" | "식료품";

export interface Product {
  id: number;
  category: Category;
  imageUrl: string;
  name: string;
  price: number;
}
