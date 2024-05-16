import styled from '@emotion/styled';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';
import { InfoIcon } from '../../assets';
import { deliveryFeeState, orderAmountState, totalAmountState } from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';

export default function OrderAmount() {
  const orderAmount = useRecoilValue(orderAmountState);
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const totalAmount = useRecoilValue(totalAmountState);

  return (
    <div>
      <DeliveryFeeInfoBox>
        <img src={InfoIcon} />총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </DeliveryFeeInfoBox>
      <OrderAmountContainer>
        <AmountItem>
          <Title>주문 금액</Title>
          <Amount>{convertToLocaleAmount(orderAmount)}</Amount>
        </AmountItem>
        <AmountItem>
          <Title>배송비</Title>
          <Amount>{convertToLocaleAmount(deliveryFee)}</Amount>
        </AmountItem>
      </OrderAmountContainer>
      <AmountItem>
        <Title>총 결제 금액</Title>
        <Amount>{convertToLocaleAmount(totalAmount)}</Amount>
      </AmountItem>
    </div>
  );
}

const DeliveryFeeInfoBox = styled.p({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  marginBottom: '12px',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

const OrderAmountContainer = styled.div({
  padding: '12px 0',
  borderTop: '1px solid #E5E5E5',
  borderBottom: '1px solid #E5E5E5',
  marginBottom: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const AmountItem = styled.div({
  width: '100%',
  height: '42px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = styled.p({
  fontSize: '16px',
  fontWeight: '700',
  color: '#0A0D13',
});

const Amount = styled.p({
  fontWeight: '700',
  fontSize: '24px',
  textAlign: 'right',
  color: 'black',
});
