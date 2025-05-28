export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  isSelected: boolean;
}

type CATEGORY = "패션잡화" | "식료품";

export interface Product {
  id: number;
  category: CATEGORY;
  imageUrl: string;
  name: string;
  price: number;
}
