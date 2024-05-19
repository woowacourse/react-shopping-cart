import type { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';

import { initialize, mswDecorator } from 'msw-storybook-addon';
import { worker } from '../src/mocks/browser';

initialize();

worker.start();

const customViewports = {
  Default: {
    name: 'Default',
    styles: {
      width: '1280px',
      height: '832px',
    },
  },
};

const localStorageResetDecorator = (Story) => {
  window.localStorage.clear();
  return <Story />;
};

export const decorators = [
  mswDecorator,
  localStorageResetDecorator,
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles()} />
          <Story />
        </ThemeProvider>
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
    viewport: {
      viewports: { ...customViewports },
      defaultViewport: 'Default',
    },
  },
};

export default preview;
