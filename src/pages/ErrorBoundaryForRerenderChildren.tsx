import React, { PropsWithChildren } from 'react';
import { ErrorComponentProps } from '../components/ErrorComponent/ErrorComponent';

type ErrorBoundaryForRerenderChildrenProps = PropsWithChildren & {
  FallbackComponent: React.ComponentType<ErrorComponentProps>;
  onReset?: (error: Error) => void;
};

interface ErrorBoundaryForRerenderChildrenState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryForRerenderChildren extends React.Component<
  ErrorBoundaryForRerenderChildrenProps,
  ErrorBoundaryForRerenderChildrenState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryForRerenderChildrenProps>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return <FallbackComponent onRetry={() => this.setState({ hasError: false, error: null })} error={error} />;
    }

    return children;
  }
}

export default ErrorBoundaryForRerenderChildren;
