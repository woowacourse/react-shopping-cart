export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartProduct = {
  id: number;
  quantity: number;
  productId: number;
};

export type UserCartProduct = {
  id: number;
  quantity: number;
  product: Product;
};

export type Cart = CartProduct[];
