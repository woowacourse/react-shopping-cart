import { cartPriceState } from "../../recoil/selectors/selectors";
import { useRecoilValue } from "recoil";
import { Wrapper, Title, Info, PriceWrapper, PriceText, Price } from "./style";
import { cartItemsAtom } from "../../recoil/atoms/atoms";

const OrderConfirm = () => {
  const { totalPrice } = useRecoilValue(cartPriceState);
  const cartItems = useRecoilValue(cartItemsAtom);
  const totalItemLength = cartItems.reduce((acc, cur) => {
    return cur.quantity + acc;
  }, 0);

  return (
    <Wrapper>
      <Title>주문 확인</Title>
      <Info>
        <div>
          총 {cartItems.length}종류의 상품 {totalItemLength}개를 주문합니다.
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
