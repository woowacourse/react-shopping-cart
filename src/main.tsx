import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SelectedCartProvider } from './shared/context/SelectedCartProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedCartProvider>
      <RouterProvider router={router} />
    </SelectedCartProvider>
  </React.StrictMode>
);
