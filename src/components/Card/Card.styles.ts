import { css } from '@emotion/react';

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

export const cartTitleCss = css({
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '15px'
});
export const cartItemPriceCss = css({
  fontSize: '24px',
  fontWeight: 'bold'
});
