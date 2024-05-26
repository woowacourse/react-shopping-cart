import { ORDER } from '../../constants/constants';
import info from '../../assets/info.svg';
import PriceInfo from '../PriceInfo/PriceInfo';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  priceInfoStore,
  orderTotalStore,
  isOverShippingFeeFreeStore,
} from '../../recoil/selectors';
import { orderDiscountState, shippingFeeState, specialAreaState } from '../../recoil/atoms';
import { useEffect } from 'react';
import * as S from './styled';

const PaymentTotal = ({ isUseDiscount }) => {
  const [orderDiscountAmount, _] = useRecoilState(orderDiscountState);
  const [shippingFeeInfo, setShippingFeeInfo] = useRecoilState(shippingFeeState);
  const priceInfo = useRecoilValue(priceInfoStore);

  const orderTotal = useRecoilValue(orderTotalStore);
  const [isSpecialArea, setIsSpecialArea] = useRecoilState(specialAreaState);
  const isOverShippingFeeFree = useRecoilValue(isOverShippingFeeFreeStore);

  useEffect(() => {
    if (isOverShippingFeeFree) {
      setShippingFeeInfo({
        ...shippingFeeInfo,
        // NOTE: 무료배송 적용 금액 이상인 경우 무조건 배송비는 0원이다.
        shipping: 0,
      });
    } else {
      setShippingFeeInfo({
        ...shippingFeeInfo,
        // NOTE: 무료배송 적용 금액 미만인 경우
        // 도서산간 체크 여부에 따라 배송비를 다르게 설정한다.
        shipping: isSpecialArea
          ? ORDER.BASIC_SHIPPING_FEE + ORDER.SPECIAL_AREA_ADDITIONAL_SHIPPING_FEE
          : ORDER.BASIC_SHIPPING_FEE,
      });
    }
  }, [orderTotal, shippingFeeInfo.isFree]);

  return (
    <S.Container>
      <S.Info>
        <img src={info} alt="" />
        <S.InfoText>{`총 주문 금액이 ${ORDER.SHIPPING_FREE_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}</S.InfoText>
      </S.Info>
      <S.Hr />
      <PriceInfo title="주문 금액" price={priceInfo.order} />
      {isUseDiscount && (
        <PriceInfo
          title="쿠폰 할인 금액"
          price={orderDiscountAmount === 0 ? orderDiscountAmount : -orderDiscountAmount}
        />
      )}
      <PriceInfo title="배송비" price={shippingFeeInfo.shipping || 0} />
      <S.Hr />
      {/* NOTE: 장바구니 페이지에서는 총 결제 금액 = 주문 금액 + 배송비이고, 쿠폰 적용 페이지에서는 할인액까지 반영한 값(priceInfo.total)이다.  */}
      <PriceInfo
        title="총 결제 금액"
        price={isUseDiscount ? priceInfo.total : priceInfo.order + priceInfo.finalShipping}
      />
    </S.Container>
  );
};

export default PaymentTotal;
