export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartProduct = {
  id: Product['id'];
  quantity: number;
  product: Product;
};
