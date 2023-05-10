import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import GlobalStyles from './GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
