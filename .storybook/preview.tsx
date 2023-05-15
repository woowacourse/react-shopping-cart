import React from 'react';
import { RecoilRoot } from 'recoil';
import { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

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

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </ThemeProvider>
  ),
];

export default preview;
