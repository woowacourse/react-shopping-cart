import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { setCartProductListAsync } from '../store/modules/cart/actions';

function CartPageLayout() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      await dispatch(setCartProductListAsync());
      setLoading(true);
    })();
  }, [dispatch]);

  return (
    <LayoutRoot>
      <Suspense fallback={<div>로딩중</div>}>{isLoading && <Outlet />}</Suspense>
    </LayoutRoot>
  );
}

const LayoutRoot = styled.div``;

export default CartPageLayout;
