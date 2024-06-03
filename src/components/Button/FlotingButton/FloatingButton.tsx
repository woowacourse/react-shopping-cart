import * as S from './FloatingButton.style';

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
    <S.ButtonContainer disabled={isDisable} onClick={onClick}>
      {text}
    </S.ButtonContainer>
  );
}
