import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

let options = {};
if (location.hostname === 'parkgeuncheol.github.io') {
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
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        </RecoilRoot>
      </ThemeProvider>
    ),
    mswDecorator,
  ],
};

export default preview;
