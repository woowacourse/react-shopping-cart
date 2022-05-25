const productActionType = {
  fetchProductsStart: "fetchProductsStart",
  fetchProductsSuccess: "fetchProductsSuccess",
  fetchProductsError: "fetchProductsError",
  fetchProductDetailStart: "fetchProductDetailStart",
  fetchProductDetailSuccess: "fetchProductDetailSuccess",
  fetchProductDetailError: "fetchProductDetailError",
} as const;

export default productActionType;
