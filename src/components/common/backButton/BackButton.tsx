import backButtonImage from '/assets/backButton.svg';
import * as S from './BackButton.styles';

interface BackButtonProps {
  onClick: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <S.BackButton onClick={onClick}>
      <img src={backButtonImage} alt="뒤로가기" />
    </S.BackButton>
  );
}

export default BackButton;
