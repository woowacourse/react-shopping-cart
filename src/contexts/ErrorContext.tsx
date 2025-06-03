import styled from "@emotion/styled";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import ErrorToast from "../components/ErrorToast";

interface ErrorItem {
  id: string;
  message: string;
}

type ErrorContextType = {
  errors: ErrorItem[];
  showError: (message: string) => void;
  removeError: (id: string) => void;
  clearAllErrors: () => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

function ErrorProvider({ children }: PropsWithChildren) {
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const showError = useCallback((message: string) => {
    const newError: ErrorItem = {
      id: `error-${Date.now()}-${Math.random()}`,
      message,
    };

    setErrors((prev) => {
      const newErrors = [...prev, newError];
      return newErrors.length > 3 ? newErrors.slice(-3) : newErrors;
    });
  }, []);

  const removeError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, showError, removeError, clearAllErrors }}>
      {children}
      <ErrorContainer>
        {errors.map((error) => (
          <ErrorToast
            key={error.id}
            errorId={error.id}
            message={error.message}
            backgroundColor="#FFC9C9"
            onClose={removeError}
          />
        ))}
      </ErrorContainer>
    </ErrorContext.Provider>
  );
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === null) {
    throw new Error("useError는 ErrorProvider 내에서 사용해야 합니다.");
  }
  return context;
};

const ErrorContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 64px;
  right: 0;
  z-index: 999;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default ErrorProvider;
