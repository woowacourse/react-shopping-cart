import * as Styled from './style';

import MESSAGE from '../../constants/Message';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  const errorMessage = `${error.message} ${MESSAGE.error.alerting}`;

  return <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>;
}

export default ErrorFallback;
