import { Component, ComponentType, PropsWithChildren } from 'react';

import HTTPError from '../../../api/HTTPError';
import { ErrorProps } from '../Error/Error';

interface ErrorBoundaryProps {
  Fallback: ComponentType<ErrorProps>;
  onReset?: (error: Error | HTTPError) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const initialState: State = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, State> {
  state: State = initialState;

  resetErrorBoundary = () => {
    this.props.onReset?.(this.state.error!);
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    const { Fallback } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Fallback
          message={error.message}
          information={error instanceof HTTPError ? error.information.payload : undefined}
          resetError={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
