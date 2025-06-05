import * as Styled from "./OrderSummary.style"

import { FREE_SHIPPING_OVER } from "../../../constants/priceSetting"
import notice from "/notice.svg"
import { getOrderSummary } from "../../../util/cart/getOrderSummary"

import { CartItem } from "../../../type/CartItem"

interface OrderSummaryProps {
  cartItemsData: CartItem[]
  selectedCartIds: number[]
}

function OrderSummary({ cartItemsData, selectedCartIds }: OrderSummaryProps) {
  const { totalPrice, shippingFee, totalPriceWithShipping } = getOrderSummary({
    cartItemsData,
    selectedCartIds,
  })

  return (
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
  )
}

export default OrderSummary
