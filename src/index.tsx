import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';
import { RecoilRoot } from 'recoil';

(async () => {
  const { worker } = await import('./mocks/browser');
  worker.start();

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <GlobalStyles />
        <App />
      </RecoilRoot>
    </React.StrictMode>
  );
})();
