import React from 'react';
import ErrorImage from '../../assets/image/error.png';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <img src={ErrorImage} alt="error occurred" style={{ width: '100%;' }} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
