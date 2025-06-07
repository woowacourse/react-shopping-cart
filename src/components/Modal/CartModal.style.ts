import { css } from '@emotion/react';
export const backdropCss = css({
  backgroundColor: 'rgba(0, 0, 0, 0.35)'
});

export const contentCss = css({
  width: '380px',

  backgroundColor: 'white',
  padding: '24px 32px',
  borderRadius: '8px',
  gap: '12px'
});

export const modalContent = css({ maxHeight: '444px', overflowY: 'auto' });

export const totalPriceCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > p:first-of-type': {
    fontWeight: 700
  },
  '& > p:last-of-type': {
    fontSize: '24px',
    fontWeight: 700
  }
});

export const footerCss = css({
  width: '100%',
  gap: '24px',
  display: 'flex',
  flexDirection: 'column'
});
export const buttonCss = css({
  width: '100%'
});

export const cartItem = css({
  display: 'flex',
  gap: '16px',
  padding: '12px 0'
});

export const cartItemWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #eee'
});

export const cartImageWrapper = css({
  width: '80px',
  height: '80px',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  }
});

export const cartTextBlock = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '4px',
  fontSize: '14px'
});

export const titleCss = css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '140px'
});
