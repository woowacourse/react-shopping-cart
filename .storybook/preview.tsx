import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import { RecoilRoot } from 'recoil';

const preview = {
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
