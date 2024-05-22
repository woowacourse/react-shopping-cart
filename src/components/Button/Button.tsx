import { ButtonStyle } from './Button.style';

interface ButtonType {
  text: string;
  onClick?: () => void;
  className: string;
}

export default function Button({ text, onClick, className }: ButtonType) {
  return (
    <ButtonStyle onClick={onClick} className={className}>
      {text}
    </ButtonStyle>
  );
}
