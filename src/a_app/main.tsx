import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// eslint-disable-next-line import/order
import '@/f_shared/styles/reset.css';
import '@/f_shared/styles/color.css';
import '@/f_shared/styles/index.css';

import { appRouter } from './appRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={appRouter()} />
    </RecoilRoot>
  </React.StrictMode>
);
