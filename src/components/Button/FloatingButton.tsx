import { FloatingButtonStyle } from './Button.style';

export default function FloatingButton({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <FloatingButtonStyle onClick={onClick} disabled={disabled}>
      {text}
    </FloatingButtonStyle>
  );
}
