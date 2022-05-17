import React from 'react';

import ErrorBoundary from 'component/ErrorBoundary';

export default {
  component: ErrorBoundary,
  title: 'ErrorBoundary',
};

const Template = (args) => <ErrorBoundary {...args} />;
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
