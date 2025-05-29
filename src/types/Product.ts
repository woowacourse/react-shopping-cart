type ProductCategory = "전체" | "식료품" | "패션잡화";

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  quantity: number;
};
