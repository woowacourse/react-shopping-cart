import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { productHandlers } from '../src/mocks/handlers/productHandlers';
import { cartHandlers } from '../src/mocks/handlers/cartHandlers';
import { worker } from '../src/mocks/browser';

let options = {};
if (location.hostname === 'semnil5202.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

export const decorators = [
  mswDecorator,
  (Story) => (
    <MemoryRouter>
      <GlobalStyle />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </MemoryRouter>
  ),
];

const preview: Preview = {
  parameters: {
    msw: {
      handlers: [...productHandlers, ...cartHandlers],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

if (typeof global.process === 'undefined') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export default preview;
