import React, { Component, ErrorInfo } from 'react';
import { NETWORK_ERROR } from '../../constants/error';
import CommonError from './CommonError';
import NetworkError from './NetworkError';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ERROR_BOUNDARY: ', error, errorInfo);
  }

  public errorComponentMap: { [key: string]: React.ElementType } = {
    [NETWORK_ERROR]: NetworkError,
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      const ErrorComponent = this.errorComponentMap[(error as Error).message] || CommonError;

      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
