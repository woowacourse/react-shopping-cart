import { ResponseCartItem, OrderSummary } from "../types/order";
import { ORDER_CONSTANTS } from "../constants/order";

export class OrderCalculator {
  /**
   * 장바구니 아이템들의 총 주문 금액을 계산합니다.
   */
  static calculateOrderAmount(cartItems: ResponseCartItem[]): number {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  /**
   * 장바구니 아이템들의 개수 정보를 계산합니다.
   */
  static calculateItemCounts(cartItems: ResponseCartItem[]) {
    return {
      totalCount: cartItems.reduce((count, cart) => count + cart.quantity, 0),
      itemTypeCount: cartItems.length,
    };
  }

  /**
   * 기본 배송비를 계산합니다 (쿠폰 적용 전).
   */
  static calculateBaseDeliveryFee(
    orderAmount: number,
    isRemoteArea: boolean = false
  ): number {
    if (
      orderAmount >= ORDER_CONSTANTS.FREE_DELIVERY_THRESHOLD ||
      orderAmount === 0
    ) {
      return isRemoteArea ? ORDER_CONSTANTS.REMOTE_AREA_FEE : 0;
    }
    return (
      ORDER_CONSTANTS.BASE_DELIVERY_FEE +
      (isRemoteArea ? ORDER_CONSTANTS.REMOTE_AREA_FEE : 0)
    );
  }

  /**
   * 주문 요약 정보를 생성합니다.
   */
  static calculateOrderSummary(cartItems: ResponseCartItem[]): OrderSummary {
    const { totalCount, itemTypeCount } = this.calculateItemCounts(cartItems);

    return {
      totalCount,
      itemTypeCount,
      summaryText: `총 ${itemTypeCount}종류의 상품 ${totalCount}개`,
    };
  }
}
