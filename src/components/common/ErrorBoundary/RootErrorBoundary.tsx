import React from 'react';

import * as Styled from './ErrorFallback/ErrorFallback.styled';

interface ErrorBoundaryProps extends React.PropsWithChildren {}

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
    if (this.state.hasError) {
      return (
        <Styled.ErrorFallbackWrapper>
          <Styled.ErrorFallbackTitle>에러가 발생했습니다.</Styled.ErrorFallbackTitle>
          <Styled.ErrorFallbackButton onClick={() => window.location.reload()}>
            다시 시도하기
          </Styled.ErrorFallbackButton>
        </Styled.ErrorFallbackWrapper>
      );
    }
    return this.props.children;
  }
}

export default RootErrorBoundary;
