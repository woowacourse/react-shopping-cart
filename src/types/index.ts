export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ShoppingBasketProduct = {
  id: number;
  quantity: number;
  product: Product;
};
