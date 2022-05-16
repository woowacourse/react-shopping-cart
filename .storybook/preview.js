import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

export const decorators = [
  (Story) => (
    <>
      <Global styles={GlobalStyles} />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
