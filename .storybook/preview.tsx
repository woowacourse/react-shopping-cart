import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';
import GlobalStyle from '../src/GlobalStyle';
import { Loading } from '../src/components/common/Spinner/Loading';

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

const customViewports = {
  default: {
    name: 'Default',
    styles: {
      width: '1280px',
      height: '700px',
    },
  },
};

const preview: Preview = {
  parameters: {
    msw: handlers,
    layout: 'centered',
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

  decorators: [
    (Story) => (
      <RecoilRoot>
        <GlobalStyle />
        <Suspense fallback={<Loading />}>
          <MemoryRouter initialEntries={['/']}>
            <Story />
          </MemoryRouter>
        </Suspense>
      </RecoilRoot>
    ),
    mswDecorator,
  ],
};

export default preview;
