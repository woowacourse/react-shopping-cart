import React from 'react';
import { NoCartItemContainer } from './CartContent/CartContent';

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = () => {
  return (
    <NoCartItemContainer role="alert">
      <p>다시 시도해 주세요.</p>
    </NoCartItemContainer>
  );
};

export default ErrorFallback;
