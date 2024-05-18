import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../stores/cartItems";
import { cartPriceState } from "../../stores/cartPrice";
import styled from "styled-components";

const OrderConfirm = () => {
  const { totalPrice } = useRecoilValue(cartPriceState);
  const cartItems = useRecoilValue(cartItemsState);

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: calc(100vh - 210px);
  width: 100%;
  text-align: center;
`;

const Title = styled.div`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extra-bold);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
`;

const PriceWrapper = styled.div`
  font-weight: var(--font-weight-extra-bold);
`;

const PriceText = styled.div`
  font-size: var(--font-size-base);
  line-height: 16px;
`;

const Price = styled.div`
  margin-top: 12px;
  font-size: var(--font-size-xl);
  line-height: 35px;
`;
