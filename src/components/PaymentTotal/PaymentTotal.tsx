import info from '../../assets/info.svg';
import * as S from './styled';
import PriceInfo from '../PriceInfo/PriceInfo';

interface PaymentTotalProps {
  priceInfo: {
    order: number;
    shipping: number;
    total: number;
  };
}

const PaymentTotal = ({ priceInfo }: PaymentTotalProps) => {
  return (
    <S.Container>
      <S.Info>
        <img src={info} alt="" />
        <S.InfoText>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</S.InfoText>
      </S.Info>
      <S.Hr />
      <PriceInfo title="주문 금액" price={priceInfo.order} />
      <PriceInfo title="배송비" price={priceInfo.shipping} />
      <S.Hr />
      <PriceInfo title="총 결제 금액" price={priceInfo.total} />
    </S.Container>
  );
};

export default PaymentTotal;
