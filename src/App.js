import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

import { worker } from 'mocks/server';
import rootReducer from 'modules';
import Header from 'templates/Header';
import MainContent from 'routes';

import theme from './style/theme';
import GlobalStyle from 'style/GlobalStyle';
import { ThemeProvider } from 'styled-components';

worker.start();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

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
