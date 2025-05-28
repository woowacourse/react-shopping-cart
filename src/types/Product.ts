import { ProductCategory } from "./ProductCategory";

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  quantity: number;
};
