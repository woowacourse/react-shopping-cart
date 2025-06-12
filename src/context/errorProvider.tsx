import { createContext, useContext, useState } from "react";

interface ErrorContextType {
  error: string;
  setError: (error: string) => void;
}
const ErrorContext = createContext<ErrorContextType | null>(null);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState("");
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within an ErrorProvider");
  }
  return context;
};
