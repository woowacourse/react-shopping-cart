type ProductTypes = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type CartItemTypes = {
  id: number;
  quantity: number;
  product: ProductTypes;
};
