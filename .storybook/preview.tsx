import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router';
import { initialize, mswDecorator } from 'msw-storybook-addon';

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
