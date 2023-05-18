import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';
import { RecoilRoot } from 'recoil';
import React from 'react';
import { handlers } from '../src/mocks/handlers';
import { initialize, mswDecorator } from 'msw-storybook-addon';

let options = {};
if (location.hostname === 'hozzijeong.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

// Initialize MSW
initialize(options);

const customViewports = {
  Default: {
    name: 'Default',
    styles: {
      width: '992px',
      height: '700px',
    },
  },
};

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </RecoilRoot>
  ),
  mswDecorator,
];

const preview: Preview = {
  parameters: {
    msw: handlers,
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewports },
      defaultViewport: 'Default',
    },
  },
};

export default preview;
