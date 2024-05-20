import { ErrorProps } from '@components/common/ErrorBoundary/ErrorFallback/ErrorFallback';
import HTTPError from '@errors/HTTPError';
import React from 'react';

interface APIErrorBoundaryProps extends React.PropsWithChildren {
  fallback: React.ComponentType<ErrorProps>;
  onReset?: (error: Error | HTTPError) => void;
}

interface APIErrorBoundaryState {
  hasError: boolean;
  error: HTTPError | null;
  isFinish: boolean;
}

class APIErrorBoundary extends React.Component<APIErrorBoundaryProps, APIErrorBoundaryState> {
  constructor(props: APIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, isFinish: false };
    this.captureReject = this.captureReject.bind(this);
    this.handleResetErrorBoundary = this.handleResetErrorBoundary.bind(this);
  }

  componentDidCatch(error: HTTPError): void {
    this.setState({ hasError: true, error, isFinish: false });
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.captureReject);
  }

  captureReject(event: PromiseRejectionEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.setState({ hasError: true, error: event.reason, isFinish: true });
  }

  handleResetErrorBoundary() {
    const { onReset } = this.props;

    const { error } = this.state;

    if (!error || !onReset) return;

    onReset(error);

    this.setState({ hasError: false, error: null, isFinish: false });
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError, error, isFinish } = this.state;

    const FallbackComponent = fallback;

    if (error instanceof HTTPError && hasError && isFinish) {
      return <FallbackComponent statusCode={error.statusCode} onResetError={this.handleResetErrorBoundary} />;
    }

    return children;
  }
}

export default APIErrorBoundary;
