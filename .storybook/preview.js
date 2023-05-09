import React from 'react';
import GlobalStyle from '../src/GlobalStyle'

export const decorators = [
  (Story) => (<>
    <GlobalStyle />
    <Story /></>
  ),
];
