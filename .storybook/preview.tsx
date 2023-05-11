import React from 'react';
import { RecoilRoot } from 'recoil';
import '../src/styles/index.css';
import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

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
  Story => (
    <RecoilRoot>
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    </RecoilRoot>
  ),
];

export default preview;
