import * as Styled from './CouponModalButton.styled';

const CouponModalButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  disabled,
  onClick,
  children,
  ...rest
}) => {
  return (
    <Styled.CouponModalButton disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </Styled.CouponModalButton>
  );
};

export default CouponModalButton;
