import * as S from './BottomConfirmButton.styled';

interface BottomConfirmButtonProps {
  buttonText: string;
  disabled: boolean;
  onClick?: () => void;
}

export default function BottomConfirmButton({
  buttonText,
  disabled,
  onClick,
}: BottomConfirmButtonProps) {
  return (
    <S.Container disabled={disabled} type="button" onClick={onClick}>
      {buttonText}
    </S.Container>
  );
}
