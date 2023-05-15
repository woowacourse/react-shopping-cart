import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle, // Adds your GlobalStyle component to all stories
    themes: {
      theme: theme,
    },
    Provider: ThemeProvider,
  }),
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
];

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

export default preview;
