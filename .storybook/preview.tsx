import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router';

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
      <MemoryRouter>
        <GlobalStyle />
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </MemoryRouter>
    ),
  ],
};

export default preview;
