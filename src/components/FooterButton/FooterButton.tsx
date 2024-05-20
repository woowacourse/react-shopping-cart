import styled from '@emotion/styled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  children?: undefined;
}

const FooterButtonContainer = styled.button({
  position: 'absolute',
  bottom: '0',
  left: '0',

  width: '100%',
  height: '64px',
  background: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '16px',
  fontWeight: '700',
  color: 'white',

  '&:hover': {
    background: '#222222',
    transition: '0.3s ease',
    cursor: 'pointer',
  },

  '&:disabled': {
    background: '#BEBEBE',
    cursor: 'default',
  },
});

export default function FooterButton({ buttonText, ...props }: ButtonProps) {
  return <FooterButtonContainer {...props}>{buttonText}</FooterButtonContainer>;
}
