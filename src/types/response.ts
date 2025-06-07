import { CartItemType } from './cartItem';
import { Product } from './product';

export interface CartItemResponse {
  content: CartItemType[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ProductResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Product[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
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

type TimeRange = {
  start: string;
  end: string;
};

export type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: TimeRange;
};
