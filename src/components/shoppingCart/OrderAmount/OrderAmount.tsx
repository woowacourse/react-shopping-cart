import { useRecoilValue } from 'recoil';
import { deliveryFeeState, orderAmountState, totalAmountState } from '../../../recoil/selectors';
import { InfoIcon } from '../../../assets';
import { convertToLocaleAmount } from '../../../utils';
import * as Styled from './OrderAmount.styled';

export default function OrderAmount() {
  const orderAmount = useRecoilValue(orderAmountState);
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const totalAmount = useRecoilValue(totalAmountState);

  return (
    <div>
      <Styled.DeliveryFeeInfoBox>
        <img src={InfoIcon} />총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </Styled.DeliveryFeeInfoBox>

      <Styled.OrderAmountContainer>
        <Styled.AmountItem>
          <Styled.Title>주문 금액</Styled.Title>
          <Styled.Amount>{convertToLocaleAmount(orderAmount)}</Styled.Amount>
        </Styled.AmountItem>

        <Styled.AmountItem>
          <Styled.Title>배송비</Styled.Title>
          <Styled.Amount>{convertToLocaleAmount(deliveryFee)}</Styled.Amount>
        </Styled.AmountItem>
      </Styled.OrderAmountContainer>

      <Styled.AmountItem>
        <Styled.Title>총 결제 금액</Styled.Title>
        <Styled.Amount>{convertToLocaleAmount(totalAmount)}</Styled.Amount>
      </Styled.AmountItem>
    </div>
  );
}
