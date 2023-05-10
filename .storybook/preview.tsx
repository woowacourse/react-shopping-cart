import type { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import '../src/index.css';

const customViewports = {
  Default: {
    name: 'Default',
    styles: {
      width: '1280px',
      height: '832px',
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewports },
      defaultViewport: 'Default',
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </MemoryRouter>
  ),
];
