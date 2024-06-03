import * as Styled from './style';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <Styled.ErrorMessage>
      {error.message} 오류가 발생하였습니다!
    </Styled.ErrorMessage>
  );
}

export default ErrorFallback;
