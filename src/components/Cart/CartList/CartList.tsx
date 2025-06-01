import * as Styled from "./CartList.style";

import { PropsWithChildren } from "react";
import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "@/constants/priceSetting";
import notice from "/notice.svg";

interface CartListProps extends PropsWithChildren {
  subtotalPrice: number;
}

function CartList({ children, subtotalPrice }: CartListProps) {
  const shippingFee = subtotalPrice >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const totalPriceWithShipping = subtotalPrice + shippingFee;
  if (subtotalPrice === 0) {
    return (
      <Styled.Container>
        <Styled.UlContainer>{children}</Styled.UlContainer>
        <Styled.EmptyCartMessage>물건을 선택해 주세용!</Styled.EmptyCartMessage>
      </Styled.Container>
    );
  }
  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
      <Styled.TotalPriceContainer>
        {shippingFee === 0 ? (
          <Styled.FreeShippingEligibilityNoticeContainer>
            <Styled.FreeShippingEligibilityNotice>
              🎉 무료배송 혜택을 받았어요! 🎉
            </Styled.FreeShippingEligibilityNotice>
          </Styled.FreeShippingEligibilityNoticeContainer>
        ) : (
          <Styled.Notice>
            <Styled.NoticeIcon src={notice} />
            <Styled.FreeShippingText>
              총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우
              무료 배송됩니다.
            </Styled.FreeShippingText>
          </Styled.Notice>
        )}
        <Styled.PriceWrapper>
          <Styled.TotalPrice>
            <Styled.TitleText>주문 금액</Styled.TitleText>
            <Styled.PriceText data-testid="subtotal-price">
              {subtotalPrice.toLocaleString()}원
            </Styled.PriceText>
          </Styled.TotalPrice>

          <Styled.ShippingFee>
            {shippingFee !== 0 && (
              <>
                <Styled.TitleText>배송비</Styled.TitleText>
                <Styled.PriceText data-testid="shipping-fee">
                  {shippingFee.toLocaleString()}원
                </Styled.PriceText>
              </>
            )}
          </Styled.ShippingFee>
        </Styled.PriceWrapper>
        <Styled.TotalPriceTitle>
          <Styled.TitleText>총 결제 금액</Styled.TitleText>
          <Styled.PriceText data-testid="total-price">
            {totalPriceWithShipping.toLocaleString()}원
          </Styled.PriceText>
        </Styled.TotalPriceTitle>
      </Styled.TotalPriceContainer>
    </Styled.Container>
  );
}

export default CartList;
