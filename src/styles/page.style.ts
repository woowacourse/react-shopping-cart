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

const fontSize12 = css({
  fontSize: '12px'
});

const descriptionCss = css(fontSize12, {
  marginBottom: '16px'
});

const allSelectCss = css(fontSize12, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});

const infoCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  marginBottom: '16px'
});

export { layoutCss, titleCss, descriptionCss, allSelectCss, infoCss, fontSize12 };
