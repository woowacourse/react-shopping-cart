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
  width: '100%',
  height: '64px',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:disabled': {
    backgroundColor: '#BEBEBE',
    cursor: 'not-allowed'
  }
});
