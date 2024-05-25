import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

// eslint-disable-next-line import/order
import '@/f_shared/styles/reset.css';
import '@/f_shared/styles/color.css';
import '@/f_shared/styles/index.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
