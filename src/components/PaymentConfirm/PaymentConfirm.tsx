import { paymentPriceState } from "../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";
import { Wrapper, Info, Price } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { Text } from "../common";

const OrderConfirm = () => {
  const paymentPrice = useRecoilValue(paymentPriceState);
  const { cartItemSelectedQuantity, cartItemSelectedKind } = useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <Text size="large">주문 확인</Text>
      <Info>
        <Text size="small">
          총 {cartItemSelectedKind}종류의 상품 {cartItemSelectedQuantity}개를 주문합니다.
        </Text>
        <Text size="small">최종 결제 금액을 확인해 주세요.</Text>
      </Info>
      <Price>
        <Text size="medium">총 결제 금액</Text>
        <Text size="large">{paymentPrice.toLocaleString("ko-KR")}원</Text>
      </Price>
    </Wrapper>
  );
};

export default OrderConfirm;
