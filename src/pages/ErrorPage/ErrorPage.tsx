import * as S from './ErrorPage.styles';
import Flex from '../../components/common/Flex';

const ErrorPage: React.FC<{ status?: number }> = ({ status }) => {
  return (
    <Flex dir="column">
      <S.ErrorMessage>
        <h1>{status ?? '예상치 못한'} 에러가 발생했습니다.</h1>
      </S.ErrorMessage>
      <S.LinkToHome to="/">Home으로 돌아가기</S.LinkToHome>
    </Flex>
  );
};

export default ErrorPage;
