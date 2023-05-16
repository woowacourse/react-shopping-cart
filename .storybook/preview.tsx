import React from 'react';
import { RecoilRoot } from 'recoil';
import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import GlobalStyles from '../src/GlobalStyles';

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
