import { SHIPPING_FEE } from "constants/cartProduct";
import { useRecoilValue } from "recoil";
import { cartTotalPrice } from "recoil/cart";
import styled from "styled-components";

const PurchaseOrder = () => {
  const totalPrice = useRecoilValue(cartTotalPrice);

  return (
    <Wrapper>
      <TitleBox>결제 예상 금액</TitleBox>
      <TotalContainer>
        <AmountBox>
          <p>총 상품 가격</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>총 배송비</p>
          <p>{(totalPrice ? SHIPPING_FEE : 0).toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>총 주문 금액</p>
          <p>{(totalPrice ? totalPrice + SHIPPING_FEE : 0).toLocaleString()}원</p>
        </AmountBox>
      </TotalContainer>
      <OrderButton>주문하기</OrderButton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: sticky;
  top: 12%;
  margin-left: auto;

  width: 30%;
  height: 40%;

  border: 1px solid rgba(221, 221, 221, 1);
  padding: 2%;

  @media screen and (max-width: 800px) {
    position: fixed;
    gap: 0;

    top: auto;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 30%;

    border-top: 1px solid black;

    background-color: white;
  }
`;

const TitleBox = styled.h2`
  border-bottom: 1px solid rgba(221, 221, 221, 1);

  padding-bottom: 5%;

  font-size: 21px;
  font-weight: 400;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 60%;
  padding: 3%;

  div:last-child {
    margin-top: auto;
    margin-bottom: 8%;
  }
`;

const AmountBox = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const OrderButton = styled.button`
  width: 100%;

  padding: 7% 10%;

  font-size: 19px;
  color: rgba(255, 255, 255, 1);
  background: #333333;
`;

export default PurchaseOrder;
