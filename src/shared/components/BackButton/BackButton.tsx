import * as S from './BackButton.styled';
import LeftArrow from '@assets/icons/left-arrow.svg';
import { useNavigate } from 'react-router';

export default function BackButton() {
  const navigate = useNavigate();

  const historyBack = () => {
    navigate(-1);
  };

  return (
    <S.Button type="button" onClick={historyBack}>
      <S.Img src={LeftArrow} alt="뒤로 가기" />
    </S.Button>
  );
}
