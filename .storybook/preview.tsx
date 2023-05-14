import React from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../src/GlobalStyle';
import type { Preview } from '@storybook/react';

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
};

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <GlobalStyle />
      <Story />
    </RecoilRoot>
  ),
];

export default preview;
