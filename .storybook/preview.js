import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ThemeStyle from 'styles/ThemeStyle';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = configureStore();

addDecorator((story) => (
  <ThemeProvider theme={ThemeStyle.lightTheme}>
    <Provider store={store}>
      <MemoryRouter>{story()}</MemoryRouter>{' '}
    </Provider>
  </ThemeProvider>
));
