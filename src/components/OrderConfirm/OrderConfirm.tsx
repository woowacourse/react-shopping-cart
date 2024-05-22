import { cartPriceState } from "../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";
import { Wrapper, Title, Info, PriceWrapper, PriceText, Price } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";

const OrderConfirm = () => {
  const { totalPrice } = useRecoilValue(cartPriceState);
  const { cartItemKind, cartItemTotalQuantity } =
    useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <Title>주문 확인</Title>
      <Info>
        <div>
          총 {cartItemKind}종류의 상품 {cartItemTotalQuantity}개를 주문합니다.
        </div>
        <div>최종 결제 금액을 확인해 주세요.</div>
      </Info>
      <PriceWrapper>
        <PriceText>총 결제 금액</PriceText>
        <Price>{totalPrice.toLocaleString("ko-KR")}원</Price>
      </PriceWrapper>
    </Wrapper>
  );
};

export default OrderConfirm;
