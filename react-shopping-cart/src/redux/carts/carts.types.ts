const cartsActionTypes = {
  fetchCartsStart: "fetchCartsStart",
  fetchCartsSuccess: "fetchCartsSuccess",
  fetchCartsError: "fetchCartsError",
  addProductToCartStart: "addProductToCartStart",
  addProductToCartSuccess: "addProductToCartSuccess",
  addProductToCartError: "addProductToCartError",
  deleteProductToCartStart: "deleteProductToCartStart",
  deleteProductToCartSuccess: "deleteProductToCartSuccess",
  deleteProductToCartError: "deleteProductToCartError",
  toggleIsChecked: "toggleIsChecked",
  allToggleIsChecked: "allToggleIsChecked",
  deleteCheckedProductsStart: "deleteCheckedProductsStart",
  deleteCheckedProductsSuccess: "deleteCheckedProductsSuccess",
  deleteCheckedProductsError: "deleteCheckedProductsError",
  increaseProductQuantity: "increaseProductQuantity",
  decreaseProductQuantity: "decreaseProductQuantity",
} as const;

export default cartsActionTypes;
