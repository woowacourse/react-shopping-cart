import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import GlobalStyle from '../src/GlobalStyle';

let options = {};
if (location.hostname === 'hyeryongchoi.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

// Initialize MSW
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

  decorators: [
    (Story) => (
      <RecoilRoot>
        <GlobalStyle />
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    ),
    mswDecorator,
  ],
};

export default preview;
