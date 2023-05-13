import React from 'react';
import { RecoilRoot } from 'recoil';
import type { Preview } from '@storybook/react';

import GlobalStyles from '../src/GlobalStyles';
// import { withThemeFromJSXProvider } from '@storybook/addon-styling';

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
  // decorators: [withThemeFromJSXProvider({ GlobalStyles })],
  decorators: [
    Story => (
      <RecoilRoot>
        <GlobalStyles />
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default preview;
