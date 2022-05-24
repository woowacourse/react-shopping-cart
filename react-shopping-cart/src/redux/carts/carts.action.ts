import cartsActionTypes from "redux/carts/carts.types";
import { CartItem, CheckedIdList } from "type";

export const fetchCartsStart = () => ({
  type: cartsActionTypes.fetchCartsStart,
});

export const fetchCartsSuccess = (carts: CartItem[]) => ({
  type: cartsActionTypes.fetchCartsSuccess,
  payload: carts,
});

export const fetchCartsError = (error: Error) => ({
  type: cartsActionTypes.fetchCartsError,
  payload: error,
});

export const addProductToCartStart = (product: CartItem) => ({
  type: cartsActionTypes.addProductToCartStart,
  payload: product,
});

export const addProductToCartSuccess = (product: CartItem) => ({
  type: cartsActionTypes.addProductToCartSuccess,
  payload: product,
});

export const addProductToCartError = (error: Error) => ({
  type: cartsActionTypes.addProductToCartError,
  payload: error,
});

export const deleteProductToCartStart = (id: string) => ({
  type: cartsActionTypes.deleteProductToCartStart,
  payload: id,
});

export const deleteProductToCartSuccess = (id: string) => ({
  type: cartsActionTypes.deleteProductToCartSuccess,
  payload: id,
});

export const deleteProductToCartError = (error: Error) => ({
  type: cartsActionTypes.deleteProductToCartError,
  payload: error,
});

export const deleteCheckedProductsStart = (checkedIdList: CheckedIdList) => ({
  type: cartsActionTypes.deleteCheckedProductsStart,
  payload: checkedIdList,
});

export const deleteCheckedProductsSuccess = (checkedIdList: CheckedIdList) => ({
  type: cartsActionTypes.deleteCheckedProductsSuccess,
  payload: checkedIdList,
});

export const deleteCheckedProductsError = (err: Error) => ({
  type: cartsActionTypes.deleteCheckedProductsError,
  payload: err,
});

export const toggleIsChecked = (id: string) => ({
  type: cartsActionTypes.toggleIsChecked,
  payload: id,
});

export const allToggleIsChecked = () => ({
  type: cartsActionTypes.allToggleIsChecked,
});

export const increaseProductQuantity = (id: string) => ({
  type: cartsActionTypes.increaseProductQuantity,
  payload: id,
});

export const decreaseProductQuantity = (id: string) => ({
  type: cartsActionTypes.decreaseProductQuantity,
  payload: id,
});

export type CartsAction =
  | ReturnType<typeof fetchCartsStart>
  | ReturnType<typeof fetchCartsSuccess>
  | ReturnType<typeof fetchCartsError>
  | ReturnType<typeof addProductToCartStart>
  | ReturnType<typeof addProductToCartSuccess>
  | ReturnType<typeof addProductToCartError>
  | ReturnType<typeof deleteProductToCartStart>
  | ReturnType<typeof deleteProductToCartSuccess>
  | ReturnType<typeof deleteProductToCartError>
  | ReturnType<typeof deleteCheckedProductsStart>
  | ReturnType<typeof deleteCheckedProductsSuccess>
  | ReturnType<typeof deleteCheckedProductsError>
  | ReturnType<typeof toggleIsChecked>
  | ReturnType<typeof allToggleIsChecked>
  | ReturnType<typeof increaseProductQuantity>
  | ReturnType<typeof decreaseProductQuantity>;
