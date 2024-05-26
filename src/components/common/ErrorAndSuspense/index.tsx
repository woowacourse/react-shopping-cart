import { ErrorBoundary } from "react-error-boundary";
import NetworkError from "../../Error/NetworkError";
import LoadingSpinner from "../LoadingSpinner";
import { Suspense } from "react";

interface ErrorAndSuspenseProps {
  children: React.ReactNode;
}

const ErrorAndSuspense = ({ children }: ErrorAndSuspenseProps) => {
  return (
    <ErrorBoundary FallbackComponent={NetworkError}>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorAndSuspense;
