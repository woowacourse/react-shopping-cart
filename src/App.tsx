import styled from '@emotion/styled';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

function App() {
  return (
    <S.layout>
      <RouterProvider router={router} />
    </S.layout>
  );
}

const S = {
  layout: styled.div`
    width: 430px;
    height: 100vh;
    margin: 0 auto;
  `,
};

export default App;
