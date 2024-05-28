import React from 'react';

interface ErrorBoundaryProps extends React.PropsWithChildren {
  fallback: React.ReactNode;
}

interface ErrorBoundaryType {
  hasError: boolean;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryType> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.captureReject = this.captureReject.bind(this);
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.captureReject);
  }

  captureReject() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}

export default RootErrorBoundary;
