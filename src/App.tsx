import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

import './App.css';
import './reset.css';

export default function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>로딩 중입니다...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}
