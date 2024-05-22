import styled from '@emotion/styled';

export const DeliveryFeeInfoBox = styled.p({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  marginBottom: '12px',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

export const OrderAmountContainer = styled.div({
  padding: '12px 0',
  borderTop: '1px solid #E5E5E5',
  borderBottom: '1px solid #E5E5E5',
  marginBottom: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const AmountItem = styled.div({
  width: '100%',
  height: '42px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Title = styled.p({
  fontSize: '16px',
  fontWeight: '700',
  color: '#0A0D13',
});

export const Amount = styled.p({
  fontWeight: '700',
  fontSize: '24px',
  textAlign: 'right',
  color: 'black',
});
