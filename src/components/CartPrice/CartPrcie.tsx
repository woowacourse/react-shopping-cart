import { useRecoilValue } from "recoil";
import { cartPriceState } from "../../recoil/selectors/selectors";
import { Wrapper, Price } from "./style";
import { MediumText, LargeText } from "../common";

export interface PriceStyleProps {
  $borderTop?: string;
}

const CartPrice = () => {
  const { orderPrice, deliveryFee, totalPrice } =
    useRecoilValue(cartPriceState);

  return (
    <Wrapper>
      <Price>
        <MediumText>주문 금액</MediumText>
        <LargeText>{orderPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
      <Price>
        <MediumText>배송비</MediumText>
        <LargeText>{deliveryFee.toLocaleString("ko-KR")}원</LargeText>
      </Price>
      <Price $borderTop="1px solid rgba(0, 0, 0, 0.1)">
        <MediumText>총 결제 금액</MediumText>
        <LargeText>{totalPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
    </Wrapper>
  );
};

export default CartPrice;
