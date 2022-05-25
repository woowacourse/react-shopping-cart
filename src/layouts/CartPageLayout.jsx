import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import { setCartProductListAsync } from '../store/modules/cart/actions';

function CartPageLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      await dispatch(setCartProductListAsync());
    })();
  }, []);

  return (
    <LayoutRoot>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </LayoutRoot>
  );
}

const LayoutRoot = styled.div``;

export default CartPageLayout;
