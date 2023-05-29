/// <reference types="vite/client" />

import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { withRouter } from 'storybook-addon-react-router-v6';
import { joinPath } from '../src/api/utils/http';
import handlers from '../src/mocks/handlers';
import GlobalStyle from '../src/styles/GlobalStyle';
import ResetStyle from '../src/styles/ResetStyle';

initialize({
  serviceWorker: {
    url: joinPath(import.meta.env.BASE_URL, 'mockServiceWorker.js'),
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers,
    },
  },
  decorators: [
    mswDecorator,
    withRouter,
    (Story) => (
      <RecoilRoot>
        <ResetStyle />
        <GlobalStyle />
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default preview;
