import * as S from './ErrorPage.styles';
import Flex from '../../components/common/Flex';

const ErrorPage = () => {
  return (
    <Flex dir="column">
      <S.ErrorMessage>
        요청하신 페이지는 존재하지 않는 페이지입니다.
      </S.ErrorMessage>
      <S.LinkToHome to="/">Home으로 돌아가기</S.LinkToHome>
    </Flex>
  );
};

export default ErrorPage;
