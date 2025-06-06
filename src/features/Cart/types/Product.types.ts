export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

export type ProductListResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Product[];
  number: number;
  sort: object;
  pageable: object;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type ProductQuery = {
  page: number;
  size: number;
  sort: string | string[];
  category: string;
};

export type NewCartItem = {
  productId: number;
  quantity: number;
};

export type UpdateCartItem = {
  cartId: number;
  newQuantity: number;
};
