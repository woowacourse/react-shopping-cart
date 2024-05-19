import * as Styled from './BasicButton.styled';

const BasicButton: React.FC<React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => {
  return <Styled.BasicButton {...rest}>{children}</Styled.BasicButton>;
};

export default BasicButton;
