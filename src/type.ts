export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  quantity: number;
  product: Product;
  unselectedForOrder: boolean;
};
