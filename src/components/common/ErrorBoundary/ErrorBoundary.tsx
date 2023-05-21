import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './type';

const initialState = {
  error: null,
} satisfies ErrorBoundaryState;

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  render() {
    const { children, errorFallback } = this.props;
    const { error } = this.state;

    if (error) {
      return errorFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}

export default ErrorBoundary;
