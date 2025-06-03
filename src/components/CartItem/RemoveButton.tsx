import { css } from '@emotion/react';
import { ComponentProps } from 'react';

export function RemoveButton(props: ComponentProps<'button'>) {
  return (
    <button css={buttonCss} {...props}>
      삭제
    </button>
  );
}

const buttonCss = css({
  backgroundColor: 'white',
  border: '1px solid #eaeaea',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  width: '40px',
  height: '24px',

  '&:hover': {
    backgroundColor: '#eaeaea'
  },

  '&:disabled': {
    backgroundColor: '#BEBEBE',
    cursor: 'not-allowed'
  }
});
