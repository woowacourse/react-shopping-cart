export type GetCartItemListParams = {
  page: string;
  size: string;
};

export type DeleteProductParams = {
  productId: number;
};

export type PatchProductParams = {
  productId: number;
  quantity: number;
};
