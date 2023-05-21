export type Item = {
  id: number;
  quantity: number;
  itemInfo: Product;
  isSelected: boolean;
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
