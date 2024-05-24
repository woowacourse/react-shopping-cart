import info from '@assets/info.svg';
import * as S from './styled';
import { useRecoilValue } from 'recoil';
import { priceInfoStore } from '@recoil/selectors';
import { discountAmountStore } from '@recoil/atoms';
import { ORDER } from '@constants/constants';
import PriceInfo from '@components/serviceCommon/PriceInfo/PriceInfo';

const PaymentTotalWithDiscount = () => {
  const priceInfo = useRecoilValue(priceInfoStore);
  const discountAmount = useRecoilValue(discountAmountStore);

  return (
    <S.Container>
      <S.Info>
        <img src={info} alt="" />
        <S.InfoText>{`총 주문 금액이 ${ORDER.SHIPPING_FREE_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}</S.InfoText>
      </S.Info>
      <S.Hr />
      <PriceInfo title="주문 금액" price={priceInfo.order} />
      <PriceInfo title="쿠폰 할인 금액" price={discountAmount === 0 ? 0 : -discountAmount} />
      <PriceInfo title="배송비" price={priceInfo.shipping} />
      <S.Hr />
      <PriceInfo title="총 결제 금액" price={priceInfo.total} />
    </S.Container>
  );
};

export default PaymentTotalWithDiscount;
