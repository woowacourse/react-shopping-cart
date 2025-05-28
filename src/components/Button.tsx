import { css } from '@emotion/react';
import { ComponentProps } from 'react';
import { useNavigate } from 'react-router';

function Button({ children, ...props }: ComponentProps<'button'>) {
  const navigate = useNavigate();

  return (
    <button css={ButtonStyles} {...props} onClick={() => navigate('/order')}>
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
