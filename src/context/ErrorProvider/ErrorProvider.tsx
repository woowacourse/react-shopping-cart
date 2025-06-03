import { createContext, useContext, useState, ReactNode } from "react";
import { Error } from "./types";

const ErrorContext = createContext<ErrorContextType>({
  error: null,
  showError: () => {},
  hideError: () => {},
});

export type ErrorContextType = {
  error: Error | null;
  showError: (error: Error) => void;
  hideError: () => void;
};
export default function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  const showError = ({ type, message }: Error) => setError({ type, message });
  const hideError = () => setError(null);

  return <ErrorContext.Provider value={{ error, showError, hideError }}>{children}</ErrorContext.Provider>;
}

export function useError() {
  return useContext(ErrorContext);
}
