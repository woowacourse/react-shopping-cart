import * as Styled from "./OrderConfirmationOrderSummary.style";

import { getOrderSummaryWithCoupon } from "../../../util/cart/getOrderSummaryWithCoupon";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "../../OrderSummary/OrderNotice/OrderNotice";
import OrderTotalPrice from "../../OrderSummary/OrderTotalPrice/OrderTotalPrice";
import OrderShippingFee from "../../OrderSummary/OrderShippingFee/OrderShippingFee";
import OrderTotalPriceWithShipping from "../../OrderSummary/OrderTotalPriceWithShipping/OrderTotalPriceWithShipping";
import OrderCouponDiscount from "../../OrderSummary/OrderCouponDiscount/OrderCouponDiscount";

interface OrderConfirmationOrderSummaryProps {
  selectedCartItems: CartItem[];
  discountAmount: number;
  isRemoteAreaShipping: boolean;
}

function OrderConfirmationOrderSummary({
  selectedCartItems,
  discountAmount,
  isRemoteAreaShipping,
}: OrderConfirmationOrderSummaryProps) {
  const { totalPrice, shippingFee, totalPriceWithShipping } =
    getOrderSummaryWithCoupon({
      selectedCartItems,
      discountAmount,
      isRemoteAreaShipping,
    });

  return (
    <Styled.TotalPriceContainer>
      <OrderNotice />
      <Styled.PriceWrapper>
        <OrderTotalPrice totalPrice={totalPrice} />
        <OrderCouponDiscount discountAmount={discountAmount} />
        <OrderShippingFee shippingFee={shippingFee} />
      </Styled.PriceWrapper>
      <OrderTotalPriceWithShipping
        totalPriceWithShipping={totalPriceWithShipping}
      />
    </Styled.TotalPriceContainer>
  );
}

export default OrderConfirmationOrderSummary;
