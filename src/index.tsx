import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import router from 'Router';
import { RecoilRoot } from 'recoil';
import GlobalStyles from 'styles/GlobalStyles';
import { worker } from 'mocks/browser';

// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }

// step2 데모사이트 동작을 위해 항상 실행
worker.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
