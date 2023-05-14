export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type Cart = {
  id: number;
  quantity: number;
  product: Product;
};
