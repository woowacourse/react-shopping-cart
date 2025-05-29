export interface CartItems {
  content: CartItemContent[];
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

export interface CartItemContent {
  id: number;
  quantity: number;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
