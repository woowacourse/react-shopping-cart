import router from '@routes/route';
import GlobalStyle from '@styles/globalStyle';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
