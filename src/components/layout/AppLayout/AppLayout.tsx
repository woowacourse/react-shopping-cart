import { Navigation } from '@components/common';
import { Outlet } from 'react-router-dom';

import * as Styled from './AppLayout.styled';

const AppLayout: React.FC<React.PropsWithChildren> = () => {
  return (
    <Styled.AppLayoutContainer>
      <Navigation />
      <Styled.OutletContainer>
        <Outlet />
      </Styled.OutletContainer>
    </Styled.AppLayoutContainer>
  );
};

export default AppLayout;
