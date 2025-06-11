import * as S from './CommonButton.styled';

type ColorType = 'white' | 'black';

interface CommonButtonProps {
  colorType: ColorType;
  buttonText: string;
  onClick: () => void;
}

export default function CommonButton({
  colorType = 'white',
  buttonText,
  onClick,
}: CommonButtonProps) {
  return (
    <S.Container colorType={colorType} onClick={onClick}>
      {buttonText}
    </S.Container>
  );
}
