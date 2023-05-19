export type ItemInfo = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Item = {
  id: number;
  quantity: number;
  itemInfo: ItemInfo;
};

export type CartList = {
  items: Item[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductList = Product[];
