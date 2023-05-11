import type { ErrorInfo, PropsWithChildren } from 'react';
import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(errorInfo.componentStack);
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
