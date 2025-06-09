export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartProduct {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartInfo {
  id: number;
  quantity: number;
}

export interface CouponType {
  id: number;
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage' | 'freeShipping' | 'buyXgetY';
  discount?: number;
  minimumAmount?: number;
  expirationDate: string;
  availableTime?: {
    start: string;
    end: string;
  };
  buyQuantity?: number;
  getQuantity?: number;
}

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
