import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';
import { handlers } from '../src/mocks/handlers';
import { RecoilRoot } from 'recoil';
import React from 'react';

let options = {};
if (location.hostname === 'xodms0309.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle, // Adds your GlobalStyle component to all stories
    themes: {
      theme: theme,
    },
    Provider: ThemeProvider,
  }),
  mswDecorator,
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
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
    msw: handlers,
  },
};

export default preview;
