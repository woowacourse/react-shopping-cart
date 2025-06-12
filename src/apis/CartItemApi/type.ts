export interface GetCartItemsParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}

export interface PostCartItemsParams {
  productId: number;
  quantity?: number;
}

export interface DeleteCartItemsParams {
  cartItemId: number;
}

export interface PatchCartItemsParams {
  cartItemId: number;
  quantity: number;
}
