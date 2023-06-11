import React from 'react';

type ErrorBoundaryProps = React.PropsWithChildren<{
	fallback: React.ReactNode;
}>;

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		console.log(error);
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
