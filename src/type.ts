export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};
