import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import { setCartProductListAsync } from '../store/modules/cart/actions';

function DefaultLayout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setCartProductListAsync()).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <LayoutRoot>
      <Suspense fallback={<Loading />}>{isLoading ? <Loading /> : <Outlet />}</Suspense>
    </LayoutRoot>
  );
}

const LayoutRoot = styled.div``;

export default DefaultLayout;
