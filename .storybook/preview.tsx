import React from 'react';
import { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../src/styles';
import theme from '../src/styles/theme';
import { handlers } from '../src/mocks/handlers';

let options = {};
if (location.hostname === 'leejin-yang.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  ),
  mswDecorator,
];

const customViewports = {
  desktop: {
    name: 'Desktop',
    styles: { width: '1600px', height: '1200px' },
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
