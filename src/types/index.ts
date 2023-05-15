export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ShoppingCartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

export type UpdateShoppingCart = (product: Product) => (quantity: number) => void;
