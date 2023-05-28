import { HTTPErrorInfo } from '../../../api/HTTPError';
import ErrorImage from '../../../assets/error-image.png';
import * as S from './Error.styles';

export interface ErrorProps {
  message: string;
  information?: HTTPErrorInfo['payload'];
  resetError: () => void;
}

const Error = ({ message, information, resetError }: ErrorProps) => {
  return (
    <S.ErrorWrapper>
      <S.ErrorContentContainer>
        <S.ErrorImage src={ErrorImage} alt="error" />
        <S.ErrorHeading size="xSmall">{message}</S.ErrorHeading>
        {information?.BODY && <S.ErrorBodyText>{information.BODY}</S.ErrorBodyText>}
        <S.ErrorResetButton variant="primary" onClick={resetError}>
          {information?.BUTTON ?? '새로고침'}
        </S.ErrorResetButton>
      </S.ErrorContentContainer>
    </S.ErrorWrapper>
  );
};

export default Error;
