import Button from 'component/common/Button';
import styled from 'styled-components';

export default function OrderContainer({ products }) {
  const totalAmount = products.reduce((amount, product) => {
    return amount + product.price * product.count;
  }, 0);

  const totalCount = products.reduce((count, product) => {
    return count + product.count;
  }, 0);

  return (
    <OrderBox>
      <OrderBoxHeader>결제예상금액</OrderBoxHeader>
      <OrderBoxBody>
        <TotalPrice>
          <span>결제예상금액</span>
          <span>
            <span>{totalAmount.toLocaleString('ko-KR')}</span>원
          </span>
        </TotalPrice>
        <Button>
          <OrderButtonContent>
            주문하기<span>{totalCount.toLocaleString('ko-KR')}</span>개
          </OrderButtonContent>
        </Button>
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

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
`;

const OrderButtonContent = styled.div`
  width: 100%;
  height: 73px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 21px;

  color: white;
  background-color: #2ac1bc;

  &:hover {
    background-color: #48d1cc;
  }
`;
