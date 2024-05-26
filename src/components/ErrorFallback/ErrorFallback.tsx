import * as S from './ErrorFallback.style';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return <S.ErrorMessage>🚨 {error.message} 🚨</S.ErrorMessage>;
}

export default ErrorFallback;
