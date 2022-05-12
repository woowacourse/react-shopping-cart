import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../actions/actions';
import { StoreState } from '../../types';
import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';

import { Product } from '../../types';

function MainPage() {
  const productList = useSelector((state: StoreState) => state.productList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(actions.getProductList());
  }, [dispatch]);

  const { availableList, outOfStockList } = productList.reduce(
    (next, product) => {
      const isAvailable = product.stock > 0;

      (isAvailable ? next.availableList : next.outOfStockList).push(product);

      return next;
    },
    {
      availableList: [] as Array<Product>,
      outOfStockList: [] as Array<Product>,
    }
  );

  return (
    <StyledPage>
      <ProductCardGrid productList={[...availableList, ...outOfStockList]} />
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
