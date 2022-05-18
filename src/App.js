import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { worker } from 'mocks/server';
import rootReducer from 'modules';
import Header from 'templates/Header';
import MainContent from 'routes';

import theme from './style/theme';
import GlobalStyle from 'style/GlobalStyle';

worker.start();

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <MainContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
