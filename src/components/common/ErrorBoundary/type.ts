import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  errorFallback: ErrorFallback;
}

export interface ErrorFallbackProps {
  error: Error;
  reset: (...args: unknown[]) => void;
}

export type ErrorFallback = (props: ErrorFallbackProps) => ReactNode;

export interface ErrorBoundaryState {
  error: Error | null;
}
