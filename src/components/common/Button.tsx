import { css } from '@emotion/react';
import { ComponentProps } from 'react';

function Button({ children, onClick, ...props }: ComponentProps<'button'>) {
  return (
    <button css={ButtonStyles} {...props} onClick={onClick}>
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
  padding: '24px 0',
  textAlign: 'center',
  position: 'sticky',
  bottom: 0,

  '&:disabled': {
    backgroundColor: '#BEBEBE',
    cursor: 'not-allowed'
  }
});
