import React, { Component, ErrorInfo } from 'react';
import { ERROR } from '../../constants/error';
import CommonError from './CommonError';
import NetworkError from './NetworkError';
import NotFoundError from './NotFoundError';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ERROR_BOUNDARY: ', error, errorInfo);
  }

  errorComponentMap: { [key: string]: React.ElementType } = {
    [ERROR.NETWORK]: NetworkError,
    [ERROR.NOT_FOUND]: NotFoundError,
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      const ErrorComponent = this.errorComponentMap[(error as Error).message] || CommonError;

      return <ErrorComponent />;
    }

    return children;
  }
}

export default ErrorBoundary;
