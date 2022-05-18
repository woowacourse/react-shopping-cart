import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import Theme from '@/styles/Theme';
import { GlobalStyle } from '@/styles/GlobalStyles';
import { store } from '@/store/store';
import App from '@/components/App';
const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
