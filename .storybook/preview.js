import React from 'react';
import { MemoryRouter } from 'react-router';
import GlobalStyle from '../src/GlobalStyle';
import { RecoilRoot } from 'recoil';
import { worker } from '../src/mocks/worker';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';
import '../public/assets/arrowUp.svg';
import '../public/assets/arrowDown.svg';
import '../public/assets/trashCan.svg';
import '../public/assets/whiteCheck.svg';

worker.start();

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <MemoryRouter>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </MemoryRouter>
    </>
  ),
];
