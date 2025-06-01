export interface GetCartItemsResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItemContent[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
export interface CartItemContent {
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

export interface CartItemsType extends CartItemContent {
  isChecked: boolean;
}

export type HandleCartItemChangeType = ({
  action,
  id,
  quantity,
}: {
  action: "patch" | "delete";
  id: number;
  quantity?: number;
}) => void;

export type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;
export type CartItemWithCheck = CartItemContent & {
  isChecked: boolean;
};
export interface UseCartReturnType {
  isLoading: boolean;
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
  cartItemListProps: {
    cartItems: CartItemsType[];
    handleCartItemChange: HandleCartItemChangeType;
    handleCheckChange: HandleCheckChangeType;
    isAllChecked: boolean;
  };
  orderResult: Record<"cartItemsTotalQuantity" | "cartItemsCheckedCount" | "totalPrice", number>;
}
