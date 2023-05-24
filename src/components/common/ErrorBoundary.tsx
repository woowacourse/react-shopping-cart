import type { PropsWithChildren } from 'react';
import React from 'react';
import { ERROR_MESSAGE } from '../../constant/index';
import ErrorBox from './ErrorBox/ErrorBox';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: keyof typeof ERROR_MESSAGE;
}

class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: 'default',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBox errorType="network" errorMessage={ERROR_MESSAGE[this.state.errorMessage]} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
