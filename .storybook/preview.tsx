import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';

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
    (Story) => (
      <RecoilRoot>
        <GlobalStyle />
        <Story />
      </RecoilRoot>
    ),
  ],
};

export default preview;
