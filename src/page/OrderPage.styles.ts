import { css } from '@emotion/react';

export const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 24px',
  gap: '16px',
  height: '100%'
});
export const titleCss = css({
  fontSize: '24px',
  fontWeight: 'bold'
});
export const descriptionCss = css({
  fontSize: '12px',
  lineHeight: 1.5
});
export const summaryCss = css({
  marginTop: '24px',
  textAlign: 'right'
});
export const priceTitleCss = css({
  fontSize: '14px',
  color: '#888'
});
export const priceCss = css({
  fontSize: '20px',
  fontWeight: 'bold'
});
export const cartItemFrameCss = css({
  borderTop: '1px solid #ccc',
  padding: '16px 0'
});
export const cartItemInfoCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});
export const cartItemImgCss = css({
  width: '112px',
  height: '112px',
  borderRadius: '8px',
  objectFit: 'cover'
});
export const cartItemPriceCss = css({
  fontSize: '16px',
  fontWeight: 'bold'
});
export const shippingCss = css({
  padding: '12px 0',
  borderTop: '1px solid #ccc',
  fontSize: '14px'
});
export const shippingNoticeCss = css({
  fontSize: '12px',
  color: '#888',
  marginTop: '4px'
});
