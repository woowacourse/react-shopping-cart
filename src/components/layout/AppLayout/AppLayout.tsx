import { Outlet } from 'react-router-dom';

import * as Styled from './AppLayout.styled';
import { Navigation } from '@components/common';

const AppLayout: React.FC<React.PropsWithChildren> = () => {
  return (
    <Styled.LayoutContainer>
      <Styled.AppLayoutContainer>
        <Navigation />
        <Styled.OutletContainer>
          <Outlet />
        </Styled.OutletContainer>
      </Styled.AppLayoutContainer>
    </Styled.LayoutContainer>
  );
};

export default AppLayout;
