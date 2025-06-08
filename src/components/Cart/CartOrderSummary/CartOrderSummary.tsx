import * as Styled from "./CartOrderSummary.style";

import { getOrderSummary } from "../../../util/cart/getOrderSummary";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "../../OrderSummary/OrderNotice/OrderNotice";
import OrderTotalPrice from "../../OrderSummary/OrderTotalPrice/OrderTotalPrice";
import OrderShippingFee from "../../OrderSummary/OrderShippingFee/OrderShippingFee";
import OrderTotalPriceWithShipping from "../../OrderSummary/OrderTotalPriceWithShipping/OrderTotalPriceWithShipping";

interface CartOrderSummaryProps {
  selectedCartItems: CartItem[];
}

function CartOrderSummary({ selectedCartItems }: CartOrderSummaryProps) {
  const { totalPrice, shippingFee, totalPriceWithShipping } = getOrderSummary({
    selectedCartItems,
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
