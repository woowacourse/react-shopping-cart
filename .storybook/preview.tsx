import type { Preview } from '@storybook/react';
import React from 'react';
import { ResetStyle } from '../src/styles/ResetStyle';
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
          <Story />
        </RecoilRoot>
      </>
    ),
  ],
};

export default preview;
