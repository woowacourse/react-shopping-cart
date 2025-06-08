export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInCart?: boolean;
  quantity?: number;
}

export interface ResponseCartItem {
  id: number;
  quantity: number;
  product: Omit<ResponseProduct, "isInCart">;
}

export interface OrderInfo {
  cartItems: ResponseCartItem[];
  originalOrderAmount: number;
  originalDeliveryFee: number;
  isRemoteArea: boolean;
}

export interface OrderSummary {
  totalCount: number;
  itemTypeCount: number;
  summaryText: string;
}

export interface OrderBreakdown {
  orderAmount: number;
  deliveryFee: number;
  couponDiscount: number;
  totalPrice: number;
  orderSummary: OrderSummary;
}
