import {GlobalStyles} from 'App.jsx';
import {addDecorator} from '@storybook/react';

addDecorator((story) => (
  <>
    <GlobalStyles />
    {story()}
  </>
));

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
