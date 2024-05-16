import { FloatingButtonStyle } from './Button.style';

export default function FloatingButton({
  text,
  isDisable,
  onClick,
}: {
  text: string;
  isDisable?: boolean;
  onClick?: () => void;
}) {
  return (
    <FloatingButtonStyle
      className={isDisable ? 'disabled' : ''}
      onClick={onClick}
    >
      {text}
    </FloatingButtonStyle>
  );
}
