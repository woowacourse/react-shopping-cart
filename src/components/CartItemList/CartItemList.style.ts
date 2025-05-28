import { css } from '@emotion/react';

export const cartItemsAreaCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
});

export const allSelectCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});
export const cartItemsListCss = css({
  width: '100%',
  height: '100%',
  overflow: 'scroll'
});

export const infoDeliveryFeeCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%'
});

export const hrSss = css({
  width: '100%',
  height: '1px',
  backgroundColor: '#e0e0e0',
  margin: '12px 0',
  border: 'none'
});

export const priceRowCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '8px 0'
});

export const priceTitleCss = css({
  fontWeight: 700,
  fontSize: '16px'
});

export const priceCss = css({
  fontWeight: 700,
  fontSize: '24px'
});
