import { ErrorMessageStyle } from './ErrorFallback.style';

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return <ErrorMessageStyle>🚨 {error.message} 🚨</ErrorMessageStyle>;
}

export default ErrorFallback;
