type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type { Product, CartItem };
