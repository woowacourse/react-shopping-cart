import { configure, addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { globalStyle, theme } from '../src/App.styles';
import { Global } from '@emotion/react';

import { store } from '../src/store';
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

addDecorator((children) => <Provider store={store}>{children()}</Provider>);

addDecorator((story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

addDecorator((style) => <ThemeProvider theme={theme}>{style()}</ThemeProvider>);

addDecorator((style) => (
  <>
    <Global styles={globalStyle} />
    {style()}
  </>
));

configure(require.context('../src', true, /\.stories\.js?$/), module);
