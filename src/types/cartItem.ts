export interface GetCartItemsResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItem[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity?: number;
}
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}
