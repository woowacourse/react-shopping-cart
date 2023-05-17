import React, { Component, ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  errorFallback?: ReactElement | null;
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

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { errorFallback = null, children } = this.props;

    if (hasError) {
      return errorFallback;
    }

    return children;
  }
}

export default ErrorBoundary;
