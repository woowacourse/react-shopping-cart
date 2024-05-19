import React from 'react';
import * as S from './ErrorFallback.styled';

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = () => {
  return (
    <S.ErrorFallBack role="alert">
      <p>다시 시도해 주세요.</p>
    </S.ErrorFallBack>
  );
};

export default ErrorFallback;
