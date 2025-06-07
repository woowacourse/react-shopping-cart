import { css } from '@emotion/react';

const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 24px',
  height: 'calc(100dvh - 128px)'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: '700'
});

const descriptionCss = css({
  fontSize: '12px',
  marginBottom: '16px'
});

const allSelectCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  fontSize: '12px',
  marginBottom: '16px'
});

export { layoutCss, titleCss, descriptionCss, allSelectCss };
