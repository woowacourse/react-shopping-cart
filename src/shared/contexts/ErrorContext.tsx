import { createContext, useContext, useState } from "react";

interface ErrorContextType {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  clearErrorMessage: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const clearErrorMessage = () => setErrorMessage("");

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage, clearErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorMessage = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("useErrorMessage must be used within an ErrorProvider");
  return context;
};
