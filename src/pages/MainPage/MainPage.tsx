import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../actions/actions';
import { StoreState } from '../../types';
import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';

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
