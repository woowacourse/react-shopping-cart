import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { worker } from './mocks/browser';
import GlobalStyle from './GlobalStyle';
import { RecoilRoot } from 'recoil';
import { Loading } from './components/common/Spinner/Loading';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const main = async () => {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);

main();
