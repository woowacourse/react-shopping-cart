import styled from '@emotion/styled';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import ToastProvider from './contexts/ToastProvider';

function App() {
  return (
    <S.Layout>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </S.Layout>
  );
}

const S = {
  Layout: styled.div`
    position: relative;
    width: 430px;
    height: 100vh;
    margin: 0 auto;
  `,
};

export default App;
