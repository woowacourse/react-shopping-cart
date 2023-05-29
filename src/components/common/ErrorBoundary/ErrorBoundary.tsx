import { Component, PropsWithChildren, ReactElement } from 'react';
import { CustomError } from '../../../validation/errors';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';

export interface ErrorBoundaryProps {
  errorFallback?: ReactElement | null;
  page?: boolean;
}

interface State {
  hasError: boolean;
  message?: string;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof CustomError) {
      return { hasError: true, message: error.message };
    }

    return { hasError: true };
  }

  render() {
    const { hasError, message } = this.state;
    const { errorFallback = null, page = false, children } = this.props;

    if (hasError) {
      return page ? <ErrorPage message={message} /> : <>{errorFallback}</>;
    }

    return children;
  }
}

export default ErrorBoundary;
