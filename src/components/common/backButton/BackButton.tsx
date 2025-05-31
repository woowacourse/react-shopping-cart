import backButtonImage from '/assets/backButton.svg';
import * as S from './BackButton.styles';
import { useNavigate } from 'react-router';

function BackButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <S.BackButton onClick={goBack}>
      <img src={backButtonImage} alt="뒤로가기" />
    </S.BackButton>
  );
}

export default BackButton;
