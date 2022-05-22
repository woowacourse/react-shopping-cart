import Styled from 'components/@shared/Button/index.style';

const Button = ({ children, ...rest }) => {
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default Button;
