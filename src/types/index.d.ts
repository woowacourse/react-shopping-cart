declare module '*.png';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductType;
};
