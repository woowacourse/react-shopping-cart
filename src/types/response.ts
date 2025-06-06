export interface ProductType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}
export interface SortInfoType {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface PageableType {
  offset: number;
  sort: SortInfoType;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}
export interface PaginatedCartResponseType {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItemType[];
  number: number;
  sort: SortInfoType;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CouponType {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: string;
  discount: number;
  minimumAmount: number;
}
