import * as Styled from './OpenCouponModalButton.style';

interface OpenCouponModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export default function OpenCouponModalButton({
  buttonText,
  ...props
}: OpenCouponModalButtonProps) {
  return <Styled.OpenCouponModalButton {...props}>{buttonText}</Styled.OpenCouponModalButton>;
}
