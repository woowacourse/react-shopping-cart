import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import theme from './style/theme';
import GlobalStyle from 'style/GlobalStyle';
import ProductListPage from './pages/ProductList';
import rootReducer from 'modules';
import Header from 'templates/Header';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
