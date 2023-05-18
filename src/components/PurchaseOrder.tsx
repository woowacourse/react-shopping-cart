import styled from "styled-components";

const PurchaseOrder = () => {
  return (
    <Wrapper>
      <TitleBox>결제 예상 금액</TitleBox>
      <TotalContainer>
        <AmountBox>
          <p>총 상품 가격</p>
          <p>21,700원</p>
        </AmountBox>
        <AmountBox>
          <p>총 배송비</p>
          <p>3,000원</p>
        </AmountBox>
        <AmountBox>
          <p>총 주문 금액</p>
          <p>24,700원</p>
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

  position: fixed;
  top: 11%;
  right: 2%;

  width: 30%;
  height: 35%;

  border: 1px solid rgba(221, 221, 221, 1);
  padding: 2%;
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
  height: 18%;

  color: rgba(255, 255, 255, 1);
  background: #333333;
`;

export default PurchaseOrder;
