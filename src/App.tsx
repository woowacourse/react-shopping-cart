import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './router';

export const App = () => {
  return (
    <RecoilRoot>
      {/* <Header /> */}
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};
