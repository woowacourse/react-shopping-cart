import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import GlobalStyles from '../src/styles/GlobalStyles';
import { RecoilRoot } from 'recoil';

const customViewport = {
  Default: {
    name: 'FHD',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  HD: {
    name: 'HD',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  tablet: {
    name: 'tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  mobile: {
    name: 'mobile',
    styles: {
      width: '380px',
      height: '768px',
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
      viewports: { ...customViewport },
      defaultViewport: 'Default',
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
  withThemeFromJSXProvider({ GlobalStyles }),
];
