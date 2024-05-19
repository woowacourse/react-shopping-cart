import * as Styled from './FooterButton.style';

interface FooterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export default function FooterButton({ buttonText, ...props }: FooterButtonProps) {
  return <Styled.FooterButton {...props}>{buttonText}</Styled.FooterButton>;
}
