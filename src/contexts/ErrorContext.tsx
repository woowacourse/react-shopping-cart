import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

type ErrorContextType = {
  errorMessage: string;
  handleErrorMessage: (value: string) => void;
};

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleErrorMessage = useCallback((newErrorMessage: string) => {
    setErrorMessage(newErrorMessage);
  }, []);

  return (
    <ErrorContext.Provider value={{ errorMessage, handleErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext는 ErrorProvider 안에서 사용해야 합니다.");
  }
  return context;
};
