import React, { Component } from 'react';
import { ERROR } from '../../constants/error';
import CustomError from '../../utils/CustomError';
import CommonError from './CommonError';
import NetworkError from './NetworkError';
import NotFoundError from './NotFoundError';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: CustomError | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: CustomError): State {
    return { error };
  }

  componentDidCatch(error: CustomError) {
    console.error(`ERROR_BOUNDARY - 에러타입 : ${error.type}, 에러메세지 : ${error.message}`);
  }

  errorComponentMap: { [key: string]: React.ElementType } = {
    [ERROR.NETWORK]: NetworkError,
    [ERROR.NOT_FOUND]: NotFoundError,
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      const ErrorComponent = this.errorComponentMap[(error as CustomError).type] || CommonError;

      return <ErrorComponent />;
    }

    return children;
  }
}

export default ErrorBoundary;
