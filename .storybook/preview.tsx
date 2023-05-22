import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import GlobalStyle from '../src/GlobalStyle';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

initialize();

export const decorators = [mswDecorator];

export const customViewPorts = {
  Default: {
    name: 'Default',
    styles: {
      width: '1320px',
      height: '832px',
    },
  },
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '372px',
      height: '700px',
    },
  },
};

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
      viewports: { ...customViewPorts },
      defaultViewport: 'Default',
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <RecoilRoot>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </RecoilRoot>
      </>
    ),
  ],
};

export default preview;
