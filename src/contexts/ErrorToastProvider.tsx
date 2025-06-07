import styled from '@emotion/styled';
import { useState } from 'react';
import { ErrorToastContext } from './ErrorToastContext';

type ErrorToastProviderProps = {
  children: React.ReactNode;
};

export const ErrorToastProvider = ({ children }: ErrorToastProviderProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}
      {errorMessage && <S.ErrorToast>{errorMessage}</S.ErrorToast>}
    </ErrorToastContext.Provider>
  );
};

const S = {
  ErrorToast: styled.div`
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #474747;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 9999;
  `,
};
