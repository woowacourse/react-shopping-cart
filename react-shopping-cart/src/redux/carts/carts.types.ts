const cartsActionTypes = {
  fetchCartsStart: "fetchCartsStart" as const,
  fetchCartsSuccess: "fetchCartsSuccess" as const,
  fetchCartsError: "fetchCartsError" as const,
  addProductToCartStart: "addProductToCartStart" as const,
  addProductToCartSuccess: "addProductToCartSuccess" as const,
  addProductToCartError: "addProductToCartError" as const,
  deleteProductToCartStart: "deleteProductToCartStart" as const,
  deleteProductToCartSuccess: "deleteProductToCartSuccess" as const,
  deleteProductToCartError: "deleteProductToCartError" as const,
  toggleIsChecked: "toggleIsChecked" as const,
  allToggleIsChecked: "allToggleIsChecked" as const,
  deleteCheckedProductsStart: "deleteCheckedProductsStart" as const,
  deleteCheckedProductsSuccess: "deleteCheckedProductsSuccess" as const,
  deleteCheckedProductsError: "deleteCheckedProductsError" as const,
  increaseProductQuantity: "increaseProductQuantity" as const,
  decreaseProductQuantity: "decreaseProductQuantity" as const,
};

export default cartsActionTypes;
