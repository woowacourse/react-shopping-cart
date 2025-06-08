import * as Styled from "./OrderConfirmationOrderSummary.style";

import { getOrderSummary } from "../../../util/cart/getOrderSummary";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "../../OrderSummary/OrderNotice/OrderNotice";
import OrderTotalPrice from "../../OrderSummary/OrderTotalPrice/OrderTotalPrice";
import OrderShippingFee from "../../OrderSummary/OrderShippingFee/OrderShippingFee";
import OrderTotalPriceWithShipping from "../../OrderSummary/OrderTotalPriceWithShipping/OrderTotalPriceWithShipping";
import OrderCouponDiscount from "../../OrderSummary/OrderCouponDiscount/OrderCouponDiscount";
import { REMOTE_AREA_SHIPPING_FEE } from "../../../constants/priceSetting";

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
  const { totalPrice, shippingFee, totalPriceWithShipping } = getOrderSummary({
    selectedCartItems,
  });

  const remoteAreaShippingFee = isRemoteAreaShipping
    ? REMOTE_AREA_SHIPPING_FEE
    : 0;

  return (
    <Styled.TotalPriceContainer>
      <OrderNotice />
      <Styled.PriceWrapper>
        <OrderTotalPrice totalPrice={totalPrice} />
        <OrderCouponDiscount discountAmount={discountAmount} />
        <OrderShippingFee shippingFee={shippingFee + remoteAreaShippingFee} />
      </Styled.PriceWrapper>
      <OrderTotalPriceWithShipping
        totalPriceWithShipping={
          totalPriceWithShipping + remoteAreaShippingFee - discountAmount
        }
      />
    </Styled.TotalPriceContainer>
  );
}

export default OrderConfirmationOrderSummary;
