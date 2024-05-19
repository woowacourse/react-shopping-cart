import * as Styled from './BottomButton.styled';

const BottomButton: React.FC<React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => {
  return <Styled.BottomButton {...rest}>{children}</Styled.BottomButton>;
};
export default BottomButton;
