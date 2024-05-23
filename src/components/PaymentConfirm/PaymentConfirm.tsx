import { cartPriceState } from "../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";
import { Wrapper, Info, Price } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { SmallText, MediumText, LargeText } from "../common";

const OrderConfirm = () => {
  const { totalPrice } = useRecoilValue(cartPriceState);
  const { cartItemKind, cartItemTotalQuantity } =
    useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <LargeText>주문 확인</LargeText>
      <Info>
        <SmallText>
          총 {cartItemKind}종류의 상품 {cartItemTotalQuantity}개를 주문합니다.
        </SmallText>
        <SmallText>최종 결제 금액을 확인해 주세요.</SmallText>
      </Info>
      <Price>
        <MediumText>총 결제 금액</MediumText>
        <LargeText>{totalPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
    </Wrapper>
  );
};

export default OrderConfirm;
