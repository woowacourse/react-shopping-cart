export interface Recipe {
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export interface OrderedItem {
  itemCount: number;
  totalQuantity: number;
}
