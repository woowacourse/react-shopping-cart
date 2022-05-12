import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalStyle from '../src/App';

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
  <>
    <GlobalStyle />
    <MemoryRouter>{story()}</MemoryRouter>
  </>
));
