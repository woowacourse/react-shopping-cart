import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ErrorBoundaryState {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <div>Error</div>
          <div>에러가 발생했습니다. 페이지를 새로고침 해주세요.</div>
          <div>Something Wrong! please refresh site.</div>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;
