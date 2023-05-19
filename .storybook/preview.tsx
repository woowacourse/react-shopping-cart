import React from 'react';
import { RecoilRoot } from 'recoil';
import { Decorator, Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';
import { MemoryRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';

let options = {};

if (location.hostname === 'gilpop8663.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

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

const localStorageResetDecorator: Decorator = (Story) => {
  window.localStorage.clear();

  return (
    <MemoryRouter initialEntries={['/']}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          <Story />
        </RecoilRoot>
      </ThemeProvider>
    </MemoryRouter>
  );
};

export const decorators: Decorator[] = [
  localStorageResetDecorator,
  mswDecorator,
];

export default preview;
