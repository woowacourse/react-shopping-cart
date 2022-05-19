import styled from 'styled-components';

export default function OrderContainer() {
  return (
    <OrderBox>
      <OrderBoxHeader>결제예상금액</OrderBoxHeader>
      <OrderBoxBody>
        <TotalPrice>
          <span>결제예상금액</span>
          <p>
            <span>21,700</span>원
          </p>
        </TotalPrice>
        <OrderButton>
          <p>
            주문하기<span>2</span>개
          </p>
        </OrderButton>
      </OrderBoxBody>
    </OrderBox>
  );
}

const OrderBox = styled.div`
  width: 448px;
  height: 318px;
  display: flex;
  flex-direction: column;
`;

const OrderBoxHeader = styled.div`
  display: flex;
  align-items: center;
  height: 41px;
  padding: 22px 30px;
  border: 1px solid #dddddd;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

const OrderBoxBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 237px;
  border: 1px solid #dddddd;
  padding: 35px 30px;
`;

const TotalPrice = styled.p`
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 73px;
`;
