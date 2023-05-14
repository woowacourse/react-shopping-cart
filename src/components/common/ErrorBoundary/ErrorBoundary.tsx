import { Component, PropsWithChildren, ReactElement } from 'react';
import { AxiosError } from 'axios';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';

export interface ErrorBoundaryProps {
  errorFallback?: ReactElement | null;
  page?: boolean;
}

interface State {
  hasError: boolean;
  status?: number;
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
    if (error instanceof AxiosError) {
      return { hasError: true, status: error.response?.status };
    }

    return { hasError: true };
  }

  render() {
    const { hasError, status } = this.state;
    const { errorFallback = null, page = false, children } = this.props;

    if (hasError) {
      return page ? <ErrorPage status={status} /> : <>{errorFallback}</>;
    }

    return children;
  }
}

export default ErrorBoundary;
