export interface CartItemsCountsResponse {
  quantity: number;
}

export interface CartItemsResponse {
  totalPages: number;
  totalElements: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  number: number;
  numberOfElements: number;
  size: number;
  content: CartItem[];
  empty: boolean;
}

interface SortObject {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface PageableObject {
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}

export interface CartItem {
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
}
