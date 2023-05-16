import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';

const CartTotal = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>결제예상금액</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Detail>
        <PriceWrapper>
          <dt>총 상품가격</dt>
          <dd>21,700원</dd>
        </PriceWrapper>
        <Spacer height={19} />
        <PriceWrapper>
          <dt>배송비</dt>
          <dd>3,000원</dd>
        </PriceWrapper>
        <Spacer height={41} />
        <PriceWrapper>
          <dt>총 주문금액</dt>
          <dd>24,700원</dd>
        </PriceWrapper>
      </Detail>
      <Spacer height={43} />
      <OrderButton>주문하기</OrderButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 410px;
  border: 1px solid #ddd;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 81px;
  border-bottom: 3px solid #dddddd;
  padding: 0 30px;
`;

const Title = styled.h3`
  font-family: 'Noto Sans KR';
  font-size: 24px;
  font-weight: normal;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const Detail = styled.dl`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > dt,
  dd {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.5px;
    color: #333333;
  }
`;

const OrderButton = styled.button`
  width: 388px;
  height: 73px;
  margin: 0 auto;
  background: #333333;
  font-family: 'Noto Sans KR';
  font-size: 24px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
`;

export default CartTotal;
