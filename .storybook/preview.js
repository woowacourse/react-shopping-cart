import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ThemeStyle from 'styles/ThemeStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => (
  <ThemeProvider theme={ThemeStyle.lightTheme}>
    <MemoryRouter>{story()}</MemoryRouter>{' '}
  </ThemeProvider>
));
