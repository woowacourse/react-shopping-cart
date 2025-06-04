import * as Styled from "./CartList.style";

import { PropsWithChildren } from "react";
import { CartItem } from "../../../type/CartItem";
import { FREE_SHIPPING_OVER } from "../../../constants/priceSetting";
import notice from "/notice.svg";
import { getOrderSummary } from "../../../util/cart/getOrderSummary";

interface CartListProps extends PropsWithChildren {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}

function CartList({ cartItemsData, selectedCartIds, children }: CartListProps) {
  const { totalPrice, shippingFee, totalPriceWithShipping } = getOrderSummary({
    cartItemsData,
    selectedCartIds,
  });

  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
      <Styled.TotalPriceContainer>
        <Styled.Notice>
          <Styled.NoticeIcon src={notice} />
          <Styled.FreeShippingText>
            총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우
            무료 배송됩니다.
          </Styled.FreeShippingText>
        </Styled.Notice>
        <Styled.PriceWrapper>
          <Styled.TotalPrice>
            <Styled.TitleText>주문 금액</Styled.TitleText>
            <Styled.PriceText>{totalPrice.toLocaleString()}원</Styled.PriceText>
          </Styled.TotalPrice>

          <Styled.ShippingFee>
            {shippingFee !== 0 && (
              <>
                <Styled.TitleText>배송비</Styled.TitleText>
                <Styled.PriceText>
                  {shippingFee.toLocaleString()}원
                </Styled.PriceText>
              </>
            )}
          </Styled.ShippingFee>
        </Styled.PriceWrapper>
        <Styled.TotalPriceTitle>
          <Styled.TitleText>총 결제 금액</Styled.TitleText>
          <Styled.PriceText>
            {totalPriceWithShipping.toLocaleString()}원
          </Styled.PriceText>
        </Styled.TotalPriceTitle>
      </Styled.TotalPriceContainer>
    </Styled.Container>
  );
}

export default CartList;
