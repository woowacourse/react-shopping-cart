import React from 'react';
import { RecoilRoot } from 'recoil';
import '../src/styles/index.css';
import type { Preview } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';

initializeWorker();

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
  mswDecorator,
  Story => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
];

export default preview;
