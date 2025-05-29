import { css } from '@emotion/react';
import { ComponentProps } from 'react';

export default function CheckBox(props: ComponentProps<'input'>) {
  return <input {...props} css={checkboxCss} type="checkbox" />;
}

const checkboxCss = css({
  width: '24px',
  height: '24px',
  borderRadius: '8px',
  accentColor: 'black',
  cursor: 'pointer'
});
