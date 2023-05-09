import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/globalStyle';
import { theme } from '../src/styles/theme';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
    themes: {
      light: theme,
    },
    Provider: ThemeProvider,
    defaultTheme: 'light',
  }),
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
