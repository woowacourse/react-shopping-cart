import { AppStyle } from './App.styled';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AppStyle>
      <Header />
      <Outlet />
    </AppStyle>
  );
}

export default App;
