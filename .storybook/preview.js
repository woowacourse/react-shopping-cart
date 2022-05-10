import {GlobalStyles} from 'App.jsx';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import theme from 'theme/theme';

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {story()}
  </ThemeProvider>
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
