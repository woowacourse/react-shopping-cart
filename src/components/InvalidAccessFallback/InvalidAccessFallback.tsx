import { useNavigate } from 'react-router-dom';
import * as S from './styled';
import Failure from '../../assets/failure.png';
import { ROUTER_URLS } from '../../constants/constants';

const ERROR_MESSAGE = `잘못된 접근입니다

돌아가세요`;

const InvalidAccessFallback = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate(ROUTER_URLS.MAIN);
  };

  return (
    <S.Container>
      <S.FailureIcon src={Failure} alt="" />
      <S.ErrorMessage>{ERROR_MESSAGE}</S.ErrorMessage>
      <S.BackButton onClick={goMain}>돌아가기</S.BackButton>
    </S.Container>
  );
};

export default InvalidAccessFallback;
