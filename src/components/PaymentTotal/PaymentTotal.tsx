import { ORDER } from '../../constants/constants';
import info from '../../assets/info.svg';
import PriceInfo from '../PriceInfo/PriceInfo';
import { useRecoilValue } from 'recoil';
import { priceInfoStore } from '../../recoil/selectors';
import * as S from './styled';

const PaymentTotal = ({ isUseDiscount }) => {
  const priceInfo = useRecoilValue(priceInfoStore);

  return (
    <S.Container>
      <S.Info>
        <img src={info} alt="" />
        <S.InfoText>{`총 주문 금액이 ${ORDER.SHIPPING_FREE_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}</S.InfoText>
      </S.Info>
      <S.Hr />
      <PriceInfo title="주문 금액" price={priceInfo.order} />
      {/* 쿠폰 할인 금액의 1000은 퍼블리싱을 위한 값 */}
      {isUseDiscount && <PriceInfo title="쿠폰 할인 금액" price={1000} />}
      <PriceInfo title="배송비" price={priceInfo.shipping || 0} />
      <S.Hr />
      <PriceInfo title="총 결제 금액" price={priceInfo.total} />
    </S.Container>
  );
};

export default PaymentTotal;
