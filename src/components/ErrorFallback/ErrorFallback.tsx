import MESSAGE from '../../constants/Message';
import * as Styled from './style';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  const errorMessage = `${error.message} ${MESSAGE.alertingError}`;

  return <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>;
}

export default ErrorFallback;
