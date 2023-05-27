import type { Preview } from '@storybook/react';
import React from 'react';
import { ResetStyle } from '../src/styles/ResetStyle';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mock/hanlders/index';

let options = {};

if (location.hostname === 'yeopto.github.io') {
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
    mswDecorator,
    (Story) => (
      <>
        <RecoilRoot>
          <HashRouter>
            <ResetStyle />
            <Story />
          </HashRouter>
        </RecoilRoot>
      </>
    ),
  ],
};

export default preview;
