import type { ErrorInfo, PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: React.ReactNode;
  onRetry?: () => void;
}>;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  override render() {
    const { fallback, children, onRetry } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          {fallback}
          {onRetry && (
            <button type="button" onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
