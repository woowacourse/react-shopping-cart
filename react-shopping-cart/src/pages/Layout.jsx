import Header from '../components/@shared/Header/Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import HomeButton from 'components/HomeButton/HomeButton';
import NavigationButtonList from 'components/NavigationButtonGroup/NavigationButtonGroup';

import { ReactComponent as Cart } from 'assets/cart.svg';

function Layout() {
  return (
    <>
      <Header
        left={<HomeButton title="MINGALSHOP" emoji={<Cart />} />}
        right={<NavigationButtonList />}
      />
      <Styled.Root>
        <Outlet />
      </Styled.Root>
    </>
  );
}

const Styled = {
  Root: styled.div`
    padding-top: 80px;
  `,
};

export default Layout;
