type ProductTypes = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItemTypes = {
  id: number;
  quantity: number;
  product: ProductTypes;
};
