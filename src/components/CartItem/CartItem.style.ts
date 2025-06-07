import { css } from '@emotion/react';

export const cartItemFrameCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderTop: '1px solid #ccc',
  padding: '16px 0'
});

export const cartItemHeaderCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
});

export const cartItemInfoCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  marginTop: '8px'
});

export const cartItemImgCss = css({
  width: '112px',
  height: '112px',
  borderRadius: '8px',
  objectFit: 'cover'
});

export const cartItemPriceCss = css({
  fontSize: '24px',
  fontWeight: 'bold'
});

export const cartItemQuantityCss = css({
  fontSize: '12px'
});

export const cartItemInfoTextCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
});
