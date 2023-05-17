import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../src/GlobalStyle';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

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
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    ),
    mswDecorator,
  ],
};

export default preview;
