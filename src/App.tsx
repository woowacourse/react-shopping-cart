import Header from '@Components/Header';
import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CommonPageStyle>
        <Outlet />
      </CommonPageStyle>
    </>
  );
}

export default App;
