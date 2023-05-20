import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../src/GlobalStyles';
import { worker } from '../src/mocks/browser';

(async () => {
  if (window.location.pathname === '/react-shopping-cart/storybook') {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
    },
  });
})();

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
    withThemeFromJSXProvider({ GlobalStyles }),
    (Story) => (
      <>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </>
    )
    
    
  ],
};

export default preview;
