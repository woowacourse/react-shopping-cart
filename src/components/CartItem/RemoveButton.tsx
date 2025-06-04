import { css } from '@emotion/react';
import { ComponentProps } from 'react';

export function RemoveButton(props: ComponentProps<'button'>) {
  return (
    <button css={inCartCss} {...props}>
      <span>삭제</span>
    </button>
  );
}

export const inCartCss = css({
  color: 'black',
  border: ' 1px solid rgba(0, 0, 0, 0.10)',
  fontSize: '12px',
  borderRadius: '4px',
  height: '24px',
  padding: '4px 8px',
  justifyContent: 'center'
});
