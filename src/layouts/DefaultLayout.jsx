import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { setCartProductListAsync } from '../store/modules/cart/actions';

function DefaultLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCartProductListAsync());
  }, [dispatch]);

  return (
    <LayoutRoot>
      <Outlet />
    </LayoutRoot>
  );
}

const LayoutRoot = styled.div``;

export default DefaultLayout;
