import { configure, addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { globalStyle, theme } from '../src/App.styles';
import { Global } from '@emotion/react';

import rootReducer from '../src/modules';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

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
