import Header from '@Components/Header';
import GlobalStyle from '@Styles/GlobalStyle';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
