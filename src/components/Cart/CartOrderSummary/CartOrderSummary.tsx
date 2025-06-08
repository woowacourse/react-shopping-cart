import * as Styled from "./CartOrderSummary.style";

import { getOrderSummary } from "../../../util/cart/getOrderSummary";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "../../OrderSummary/OrderNotice/OrderNotice";
import OrderTotalPrice from "../../OrderSummary/OrderTotalPrice/OrderTotalPrice";
import OrderShippingFee from "../../OrderSummary/OrderShippingFee/OrderShippingFee";
import OrderTotalPriceWithShipping from "../../OrderSummary/OrderTotalPriceWithShipping/OrderTotalPriceWithShipping";

interface CartOrderSummaryProps {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}

function CartOrderSummary({
  cartItemsData,
  selectedCartIds,
}: CartOrderSummaryProps) {
  const { totalPrice, shippingFee, totalPriceWithShipping } = getOrderSummary({
    cartItemsData,
    selectedCartIds,
  });

  return (
    <Styled.TotalPriceContainer>
      <OrderNotice />
      <Styled.PriceWrapper>
        <OrderTotalPrice totalPrice={totalPrice} />
        <OrderShippingFee shippingFee={shippingFee} />
      </Styled.PriceWrapper>
      <OrderTotalPriceWithShipping
        totalPriceWithShipping={totalPriceWithShipping}
      />
    </Styled.TotalPriceContainer>
  );
}

export default CartOrderSummary;
