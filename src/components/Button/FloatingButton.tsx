import { FloatingButtonStyle } from './Button.style';

export default function FloatingButton({
  text,
  isDisable,
}: {
  text: string;
  isDisable?: boolean;
}) {
  return (
    <FloatingButtonStyle className={isDisable ? 'disabled' : ''}>
      {text}
    </FloatingButtonStyle>
  );
}
