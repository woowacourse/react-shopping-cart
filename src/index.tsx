import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyles from './GlobalStyles';
import router from './router';
import { worker } from './mocks/browser';
import Routes from './constants/Routes';
import MswHandlerButton from './components/commons/MswHandler/MswHandlerButton';

(async () => {
  if (window.location.pathname === Routes.BASENAME) {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: `${Routes.BASENAME}/mockServiceWorker.js`,
    },
  });
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <MswHandlerButton />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
