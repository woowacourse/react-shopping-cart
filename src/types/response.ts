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

export type DiscountType = "fixed" | "buyXgetY" | "freeShipping" | "percentage";

export interface BaseCoupon {
  id: number;
  code: string;
  description: string;
  discountType: DiscountType;
  expirationDate: string;
}

export interface FixedCoupon extends BaseCoupon {
  discountType: "fixed";
  discount: number;
  minimumAmount: number;
}

export interface BogoCoupon extends BaseCoupon {
  discountType: "buyXgetY";
  buyQuantity: number;
  getQuantity: number;
}

export interface FreeShippingCoupon extends BaseCoupon {
  discountType: "freeShipping";
  minimumAmount: number;
}

export interface AvailableTime {
  start: string;
  end: string;
}

export interface MiracleSaleCoupon extends BaseCoupon {
  discountType: "percentage";
  discount: number;
  availableTime: AvailableTime;
}

export type CouponType =
  | FixedCoupon
  | BogoCoupon
  | FreeShippingCoupon
  | MiracleSaleCoupon;
