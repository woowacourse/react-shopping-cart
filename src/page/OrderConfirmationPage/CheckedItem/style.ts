import styled from '@emotion/styled';

export const CartItemContainer = styled.li({
  borderTop: '1px solid #E5E5E5',
  padding: '12px 0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const CardItemContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
});

export const ProductImageBox = styled.img({
  width: '112px',
  height: '112px',
  border: '1px solid #E5E5E5',
  borderRadius: '8px',
});

export const ProductInfoBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
  maxWidth: '246px',

  margin: '9px 0',
  textOverflow: 'ellipsis',
});

export const ProductName = styled.p({
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

export const ProductPrice = styled.p({
  color: '#000000',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '14px',
});
