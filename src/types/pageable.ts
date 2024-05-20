export interface Pageable<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  sort: Sort;
  pageable: PageableDetail;
  number: number;
  numberOfElements: number;
  size: number;
  content: T[];
  empty: boolean;
}

export interface PageableDetail {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
  offset: number;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
