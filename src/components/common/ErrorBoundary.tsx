import React, { PropsWithChildren } from "react";
import { ERROR_CODE } from "../../constants/error";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}
export default class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "Somthing wrong!",
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <h1>{ERROR_CODE[this.state.errorMessage]}</h1>;
    }

    return this.props.children;
  }
}
