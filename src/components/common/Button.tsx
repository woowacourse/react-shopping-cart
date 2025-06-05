import { css } from '@emotion/react';
import { ComponentProps } from 'react';

function Button({ children, ...props }: ComponentProps<'button'>) {
  return (
    <button css={ButtonStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;

const ButtonStyles = css({
  backgroundColor: 'black',
  color: 'white',
  width: '430px',
  minHeight: '64px',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  position: 'absolute',
  bottom: 0,

  '&:disabled': {
    backgroundColor: '#BEBEBE',
    cursor: 'not-allowed'
  }
});
