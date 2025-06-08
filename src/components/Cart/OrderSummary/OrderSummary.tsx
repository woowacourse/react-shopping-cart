import * as Styled from "./OrderSummary.style";

import { getOrderSummary } from "../../../util/cart/getOrderSummary";

import { CartItem } from "../../../type/CartItem";
import OrderNotice from "./OrderNotice/OrderNotice";
import OrderTotalPrice from "./OrderTotalPrice/OrderTotalPrice";

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
        <Styled.ShippingFee>
          <Styled.TitleText>배송비</Styled.TitleText>
          <Styled.PriceText>{shippingFee.toLocaleString()}원</Styled.PriceText>
        </Styled.ShippingFee>
      </Styled.PriceWrapper>
      <Styled.TotalPriceTitle>
        <Styled.TitleText>총 결제 금액</Styled.TitleText>
        <Styled.PriceText>
          {totalPriceWithShipping.toLocaleString()}원
        </Styled.PriceText>
      </Styled.TotalPriceTitle>
    </Styled.TotalPriceContainer>
  );
}

export default OrderSummary;
