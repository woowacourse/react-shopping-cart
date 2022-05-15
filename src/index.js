import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { GlobalStyle } from 'styles/GlobalStyle';
import ThemeStyle from 'styles/ThemeStyle';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={ThemeStyle.lightTheme}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
);
