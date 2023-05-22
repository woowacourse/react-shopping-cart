import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import GlobalStyle from '../src/styles/GlobalStyle';

let options = {};
if (location.hostname === 'shackstack.github.io') {
  options = {
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  };
}

initialize(options);

const preview: Preview = {
  parameters: {
    msw: handlers,
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
