import { styled } from 'styled-components';
import Spacer from '../../common/Spacer/Spacer';
import { formatPrice } from '../../../utils/formatPrice';

const FREE_SHIPPING_PRICE = 30_000;
const SHIPPING_FEE = 3_000;

const CartTotal = ({ totalProductPrice }: { totalProductPrice: number }) => {
  const isFreeShipping = totalProductPrice >= FREE_SHIPPING_PRICE;

  const calcTotalOrderPrice = () => {
    if (totalProductPrice <= 0) return 0;

    return isFreeShipping
      ? totalProductPrice
      : totalProductPrice + SHIPPING_FEE;
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>결제예상금액</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Detail>
        <PriceWrapper>
          <dt>총 상품가격</dt>
          <dd>{formatPrice(totalProductPrice)}</dd>
        </PriceWrapper>
        <Spacer height={19} />
        <PriceWrapper>
          <dt>배송비</dt>
          {isFreeShipping ? (
            <OrderDetail>
              <dd>
                <s>{formatPrice(SHIPPING_FEE)}</s>
              </dd>
              <span>
                ({formatPrice(FREE_SHIPPING_PRICE)} 이상 주문시 무료배송)
              </span>
            </OrderDetail>
          ) : (
            <dd>{formatPrice(totalProductPrice > 0 ? SHIPPING_FEE : 0)}</dd>
          )}
        </PriceWrapper>
        <Spacer height={41} />
        <PriceWrapper>
          <dt>총 주문금액</dt>
          <dd>{formatPrice(calcTotalOrderPrice())}</dd>
        </PriceWrapper>
      </Detail>
      <Spacer height={43} />
      <OrderButton disabled={totalProductPrice === 0}>
        {totalProductPrice === 0
          ? '장바구니에 상품을 담아주세요.'
          : `주문하기 (총 ${formatPrice(calcTotalOrderPrice())})`}
      </OrderButton>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 130px;
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

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
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

  &:disabled {
    background-color: #afafaf;
  }
`;

export default CartTotal;
