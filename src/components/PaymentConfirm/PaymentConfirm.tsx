import { paymentPriceState } from "../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";
import { Wrapper, Info, Price } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { SmallText, MediumText, LargeText } from "../common";

const OrderConfirm = () => {
  const paymentPrice = useRecoilValue(paymentPriceState);
  const { cartItemSelectedQuantity, cartItemSelectedKind } =
    useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <LargeText>주문 확인</LargeText>
      <Info>
        <SmallText>
          총 {cartItemSelectedKind}종류의 상품 {cartItemSelectedQuantity}개를
          주문합니다.
        </SmallText>
        <SmallText>최종 결제 금액을 확인해 주세요.</SmallText>
      </Info>
      <Price>
        <MediumText>총 결제 금액</MediumText>
        <LargeText>{paymentPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
    </Wrapper>
  );
};

export default OrderConfirm;
