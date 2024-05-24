import * as S from './style';

import { checkedItemsState, couponAmountState, deliveryFeeState } from '../../../recoil/selectors';

import { InfoIcon } from '../../../assets';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';
import { useRecoilValue } from 'recoil';

export default function CartAmountWithCoupon() {
  const checkedItems = useRecoilValue(checkedItemsState);
  const orderAmount = checkedItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );
  const couponAmount = useRecoilValue(couponAmountState);
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const totalAmount = orderAmount + deliveryFee - couponAmount;

  return (
    <div>
      <S.DeliveryFeeInfoBox>
        <img src={InfoIcon} />총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </S.DeliveryFeeInfoBox>
      <S.OrderAmountContainer>
        <S.AmountItem>
          <S.Title>주문 금액</S.Title>
          <S.Amount>{convertToLocaleAmount(orderAmount)}</S.Amount>
        </S.AmountItem>
        <S.AmountItem>
          <S.Title>쿠폰 할인 금액</S.Title>
          <S.Amount>{`-${convertToLocaleAmount(couponAmount)}`}</S.Amount>
        </S.AmountItem>
        <S.AmountItem>
          <S.Title>배송비</S.Title>
          <S.Amount>{convertToLocaleAmount(deliveryFee)}</S.Amount>
        </S.AmountItem>
      </S.OrderAmountContainer>
      <S.AmountItem>
        <S.Title>총 결제 금액</S.Title>
        <S.Amount>{convertToLocaleAmount(totalAmount)}</S.Amount>
      </S.AmountItem>
    </div>
  );
}
