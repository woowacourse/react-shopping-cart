import React from 'react';
import { RecoilRoot } from 'recoil';
import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import GlobalStyles from '../src/GlobalStyles';
import { worker } from '../src/mocks/browser';

const main = async () => {
  const url =
    location.hostname === 'jeonjeunghoon.github.io'
      ? '/react-shopping-cart/mockServiceWorker.js'
      : '/mockServiceWorker.js';

  await worker.start({
    serviceWorker: { url },
  });
};

main();

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
    withRouter,
    Story => (
      <RecoilRoot>
        <GlobalStyles />
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default preview;
