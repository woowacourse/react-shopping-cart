import React from 'react';
import type { Preview } from '@storybook/react';
import ResetStyle from '../src/styles/ResetStyle';
import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';

export const decorators = [
  (Story) => {
    return (
      <BrowserRouter>
        <ResetStyle />
        <GlobalStyle />
        <Story />
      </BrowserRouter>
    );
  },
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
