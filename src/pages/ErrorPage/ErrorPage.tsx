import * as S from './ErrorPage.styles';
import Flex from '../../components/common/Flex';
import { PAGE_ROUTES } from '../../constants/routes';
import { ERROR_MESSAGE } from '../../constants/errors';

const ErrorPage: React.FC<{ message?: string }> = ({
  message = ERROR_MESSAGE['UNEXPECTED_ERROR'],
}) => {
  return (
    <Flex dir="column">
      <S.ErrorMessage>
        <h1>{message}</h1>
      </S.ErrorMessage>
      <S.LinkToHome to={PAGE_ROUTES.HOME}>Home으로 돌아가기</S.LinkToHome>
    </Flex>
  );
};

export default ErrorPage;
