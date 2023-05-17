import React from 'react';
import { RecoilRoot } from 'recoil';
import { Decorator, Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/globalStyle';

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

const localStorageResetDecorator: Decorator = (Story) => {
  window.localStorage.clear();
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />
        <Story />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export const decorators: Decorator[] = [localStorageResetDecorator];

export default preview;
