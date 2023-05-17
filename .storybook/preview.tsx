import type { Preview } from '@storybook/react';
import React from 'react';
import GlobalStyle from '../src/styles/GlobalStyle';
import ResetStyle from '../src/styles/ResetStyle';
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
      <>
        <RecoilRoot>
          <ResetStyle />
          <GlobalStyle />
          <Story />
        </RecoilRoot>
      </>
    ),
  ],
};

export default preview;
