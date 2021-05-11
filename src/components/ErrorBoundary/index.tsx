import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ERROR_BOUNDARY: ', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>에러발생 삐용삐용</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
