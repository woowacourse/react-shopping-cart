import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import Theme from './styles/Theme';
import { Provider } from 'react-redux';
import { store } from './store/store';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/react-shopping-cart') {
      window.location.pathname = '/react-shopping-cart/';
      return;
    }

    const { worker } = require('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/react-shopping-cart/mockServiceWorker.js',
      },
      onUnhandledRequest(req) {
        if (!req.url.pathname.startsWith('/react-shopping-cart/static/media/')) {
          console.warn('Found an unhandled %s request to %s', req.method, req.url.href);
        }
      },
      quiet: true,
    });
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
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
}
main();
