import React from 'react';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';

export default {
  component: ErrorPendingBoundary,
  title: 'ErrorBoundary',
};

const Template = (args) => <ErrorPendingBoundary {...args} />;
export const ErrorBoundaryWithError = Template.bind({});
ErrorBoundaryWithError.args = {
  children: <div>here comes what you want to render</div>,
  fallback: <div>error</div>,
  pending: false,
  error: true,
};

export const ErrorBoundaryWithoutError = Template.bind({});
ErrorBoundaryWithoutError.args = {
  children: <div>here comes what you want to render</div>,
  fallback: <div>error</div>,
  pending: false,
  error: false,
};
