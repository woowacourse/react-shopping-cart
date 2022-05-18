const ordersActionTypes = {
  fetchOrdersStart: "fetchOrdersStart",
  fetchOrderSuccess: "fetchOrderSuccess",
  fetchOrderError: "fetchOrderError",
  addOrderStart: "addOrderStart",
  addOrderSuccess: "addOrderSuccess",
  addOrderError: "addOrderError",
  deleteOrderStart: "deleteOrderStart",
  deleteOrderSuccess: "deleteOrderSuccess",
  deleteOrderError: "deleteOrderError",
} as const;

export default ordersActionTypes;
