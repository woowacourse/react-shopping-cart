import React, { Component, ReactElement, ReactNode, Suspense } from 'react';
import { AxiosError } from 'axios';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';

interface Props {
  children: ReactNode;
  loadingFallback?: ReactElement | null;
  errorFallback?: ReactElement | null;
  page?: boolean;
}

interface State {
  hasError: boolean;
  status?: number;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
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
    const {
      loadingFallback = null,
      errorFallback = null,
      page = false,
      children,
    } = this.props;

    if (hasError) {
      return page ? <ErrorPage status={status} /> : <>{errorFallback}</>;
    }

    return <Suspense fallback={loadingFallback}>{children}</Suspense>;
  }
}

export default ErrorBoundary;
