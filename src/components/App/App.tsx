import { Outlet } from 'react-router-dom';

import { StyledApp } from './App.styled';
import Header from '../Header/Header';

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Outlet />
    </StyledApp>
  );
};

export default App;
