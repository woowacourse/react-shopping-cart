import { ButtonStyle } from './Button.style';

export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
}
