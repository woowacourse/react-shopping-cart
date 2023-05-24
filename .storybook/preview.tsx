import React from 'react';
import type { Preview } from '@storybook/react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter basename={'/'}>
        <RecoilRoot>
          <GlobalStyle />
          <Story />
        </RecoilRoot>
      </BrowserRouter>
    ),
  ],
};

export default preview;
