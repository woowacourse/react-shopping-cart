export interface RecipeType {
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
  discount?: number;
}

export interface OrderedItemType {
  itemCount: number;
  totalQuantity: number;
}
