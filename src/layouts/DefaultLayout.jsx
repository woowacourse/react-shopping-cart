import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function DefaultLayout() {
  return (
    <LayoutRoot>
      <Outlet />
    </LayoutRoot>
  );
}

const LayoutRoot = styled.div``;

export default DefaultLayout;
