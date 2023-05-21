import React from 'react';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import GlobalStyle from '../src/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';

import { handlers } from '../src/mocks/handlers';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

initialize();

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  ),
  mswDecorator,
];

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: { width: '1600px', height: '1200px' },
  },
  msw: {
    handlers: [...handlers],
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
  msw: handlers,
};

const preview: Preview = { parameters };

export default preview;
