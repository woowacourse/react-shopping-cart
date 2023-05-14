import type { Preview } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/style/theme';
import GlobalStyle from '../src/style/globalStyle';

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
  decorators: [
    (Story) => (
      <RecoilRoot>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>
    ),
  ],
};

export default preview;
