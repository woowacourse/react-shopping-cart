import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../src/styles/global-style';
import Theme from '../src/styles/theme';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';
import '../public/assets/delete.svg';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </ThemeProvider>
  ),
];
