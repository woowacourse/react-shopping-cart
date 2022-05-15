import { useDispatch, useSelector } from 'react-redux';

import ProductCardGrid from 'components/ProductCardGrid/ProductCardGrid';
import { StoreState } from 'types';
import { actions } from 'actions/actions';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';

function MainPage() {
  const productList = useSelector((state: StoreState) => state.productList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(actions.getProductList());
  }, [dispatch]);

  return (
    <StyledPage>
      <ProductCardGrid productList={productList} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  margin: 60px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
