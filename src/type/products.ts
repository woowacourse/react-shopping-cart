import {Pageable} from './pageable';

export interface Product {
  category: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductsResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}
