import ErrorImage from '../../../assets/error-image.png';
import { HTTP_ERROR_MESSAGE } from '../../../constants/api';
import { HTTPErrorMessageCode } from '../../../types/api';
import * as S from './Error.styles';

export interface ErrorProps {
  message: string;
  statusCode?: HTTPErrorMessageCode;
  resetError: () => void;
}

const Error = ({ message, statusCode, resetError }: ErrorProps) => {
  const HTTP_ERROR_CONTENT = statusCode ? HTTP_ERROR_MESSAGE[statusCode] : null;

  return (
    <S.ErrorWrapper>
      <S.ErrorContentContainer>
        <S.ErrorImage src={ErrorImage} alt="error" />
        <S.ErrorHeading size="xSmall">{message}</S.ErrorHeading>
        {HTTP_ERROR_CONTENT?.BODY && <S.ErrorBodyText>{HTTP_ERROR_CONTENT.BODY}</S.ErrorBodyText>}
        <S.ErrorResetButton variant="primary" onClick={resetError}>
          {HTTP_ERROR_CONTENT?.BUTTON ?? '새로고침'}
        </S.ErrorResetButton>
      </S.ErrorContentContainer>
    </S.ErrorWrapper>
  );
};

export default Error;
