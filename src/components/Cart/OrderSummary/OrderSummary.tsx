import * as Styled from "./OrderSummary.style";

import { getOrderSummary } from "../../../util/cart/getOrderSummary";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "./OrderNotice/OrderNotice";
import OrderTotalPrice from "./OrderTotalPrice/OrderTotalPrice";
import OrderShippingFee from "./OrderShippingFee/OrderShippingFee";
import OrderTotalPriceWithShipping from "./OrderTotalPriceWithShipping/OrderTotalPriceWithShipping";

interface OrderSummaryProps {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}

function OrderSummary({ cartItemsData, selectedCartIds }: OrderSummaryProps) {
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

export default OrderSummary;
