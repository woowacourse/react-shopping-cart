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
  increaseProductQuantity: "increaseProductQuantity",
  decreaseProductQuantity: "decreaseProductQuantity",
};

export default cartsActionTypes;
