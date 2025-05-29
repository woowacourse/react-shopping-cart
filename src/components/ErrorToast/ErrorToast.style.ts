import { css } from '@emotion/react';
export const toastCss = css({
  background: '#FFC9C9',
  width: '382px',
  padding: '12px 20px',
  margin: '0 auto',
  marginTop: '32px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  opacity: 1,
  transition: 'opacity 0.3s ease-in-out'
});

export const messageCss = css({
  margin: 0,
  fontSize: '16px',
  fontWeight: '500',
  color: '#D63031'
});

export const closeButtonCss = css({
  background: 'none',
  border: 'none',
  color: '#D63031',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '0 0 0 10px'
});
