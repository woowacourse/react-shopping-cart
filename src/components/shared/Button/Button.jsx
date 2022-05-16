import Styled from 'components/shared/button/style';

const Button = ({ children, ...rest }) => {
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default Button;
