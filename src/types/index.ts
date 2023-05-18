export type CartItems = { [itemID: number]: { quantity: number } };

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
};
