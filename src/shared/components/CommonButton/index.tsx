import * as S from './CommonButton.styled';

interface CommonButtonProps {
  buttonText: string;
  onClick: () => void;
}

export default function CommonButton({ buttonText, onClick }: CommonButtonProps) {
  return <S.Container onClick={onClick}>{buttonText}</S.Container>;
}
