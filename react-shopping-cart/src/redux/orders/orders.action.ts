import { Carts } from "type";
import ordersActionTypes from "./orders.types";

export const fetchOrdersStart = () => ({
  type: ordersActionTypes.fetchOrdersStart,
});

export const fetchOrdersSuccess = (orders: Carts) => ({
  type: ordersActionTypes.fetchOrderSuccess,
  payload: orders,
});

export const fetchOrdersError = (error: Error) => ({
  type: ordersActionTypes.fetchOrderError,
  payload: error,
});

export const addOrderStart = (orderItems: Carts) => ({
  type: ordersActionTypes.addOrderStart,
  payload: orderItems,
});

export const addOrderSuccess = (orderItems: Carts) => ({
  type: ordersActionTypes.addOrderSuccess,
  payload: orderItems,
});

export const addOrderError = (error: Error) => ({
  type: ordersActionTypes.addOrderError,
  payload: error,
});

export const deleteOrderStart = (id: string) => ({
  type: ordersActionTypes.deleteOrderStart,
  payload: id,
});

export const deleteOrderSuccess = (id: string) => ({
  type: ordersActionTypes.deleteOrderSuccess,
  payload: id,
});

export const deleteOrderError = (error: Error) => ({
  type: ordersActionTypes.deleteOrderError,
  payload: error,
});

export type OrdersAction =
  | ReturnType<typeof fetchOrdersStart>
  | ReturnType<typeof fetchOrdersSuccess>
  | ReturnType<typeof fetchOrdersError>
  | ReturnType<typeof addOrderStart>
  | ReturnType<typeof addOrderSuccess>
  | ReturnType<typeof addOrderError>
  | ReturnType<typeof deleteOrderStart>
  | ReturnType<typeof deleteOrderSuccess>
  | ReturnType<typeof deleteOrderError>;
