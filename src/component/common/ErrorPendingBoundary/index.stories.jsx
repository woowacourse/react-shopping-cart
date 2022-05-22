import React from 'react';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';

export default {
  component: ErrorPendingBoundary,
  title: 'Common/ErrorBoundary',
  argTypes: {
    error: {table: {disable: true}},
    pending: {table: {disable: true}},
    children: {control: {disable: null}},
    fallback: {control: {disable: null}},
  },
};

const Template = (args) => <ErrorPendingBoundary {...args} />;
export const WithError = Template.bind({});
WithError.args = {
  fallback: <div>here comes error</div>,
  pending: false,
  error: true,
};

export const WithoutError = Template.bind({});
WithoutError.args = {
  children: <div>here comes what you want to render</div>,
  pending: false,
  error: false,
};

export const WhilePending = Template.bind({});
WhilePending.args = {
  pending: true,
  error: false,
};
