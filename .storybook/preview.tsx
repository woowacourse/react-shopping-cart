import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '../src/GlobalStyle';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';
import { handlers } from '../src/mocks/handlers/index';
import { MemoryRouter } from 'react-router-dom';

initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: handlers,
  },
};

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <GlobalStyle />
      <MemoryRouter initialEntries={['/']}>
        <Suspense>
          <Story />
        </Suspense>
      </MemoryRouter>
    </RecoilRoot>
  ),
  mswDecorator,
];

export default preview;
