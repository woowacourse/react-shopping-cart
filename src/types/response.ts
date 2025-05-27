export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface CartItemContent {
  id: number;
  quantity: number;
  product: BaseProduct;
}

export type CartItems = PaginatedResponse<CartItemContent>;
