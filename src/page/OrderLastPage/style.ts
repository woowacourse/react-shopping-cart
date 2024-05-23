import styled from '@emotion/styled';

export const ConfirmPurchaseContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '24px',
  height: '100%',
  flex: '1 0 auto',
});

export const Title = styled.h2({
  fontSize: '24px',
  fontWeight: '700',
});

export const Description = styled.p({
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

export const TotalAmountTitle = styled.h3({
  color: '#0A0D13',
  fontSize: '16px',
  fontWeight: '700',
});

export const TotalAmount = styled.div({
  fontSize: '24px',
  fontWeight: '700',
});
