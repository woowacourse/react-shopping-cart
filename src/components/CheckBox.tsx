import { css } from '@emotion/react';

export default function CheckBox() {
  return <input css={checkboxCss} type="checkbox" />;
}

const checkboxCss = css({
  width: '24px',
  height: '24px',
  borderRadius: '8px'
});
