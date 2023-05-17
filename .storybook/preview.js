import React from 'react';
import GlobalStyle from '../src/GlobalStyle';
import { RecoilRoot } from 'recoil';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';
import '../public/assets/arrowUp.svg';
import '../public/assets/arrowDown.svg';

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </>
  ),
];
