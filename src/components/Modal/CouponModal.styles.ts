import { css } from '@emotion/react';

export const backdropCss = css({
  backgroundColor: 'rgba(0, 0, 0, 0.35)'
});
export const descStyle = css({
  fontSize: '14px',
  color: '#666',
  margin: '8px 0 16px'
});
export const couponListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '24px'
});

export const selectedStyle = css({
  borderColor: '#000',
  background: '#f4f4f4'
});
export const confirmButtonStyle = css({
  width: '100%',
  background: '#000',
  color: '#fff',
  fontWeight: 'bold',
  padding: '14px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer'
});

export const couponItemStyle = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  padding: '16px',
  background: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: '#000'
  }
});

export const couponLabelStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flexGrow: 1,
  cursor: 'pointer'
});
