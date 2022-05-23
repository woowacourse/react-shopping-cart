import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONDITION from 'constants/condition';
import ProductCardGrid from 'components/ProductCardGrid/ProductCardGrid';
import { ProductStoreState } from 'types/index';
import { getProducts } from 'redux/thunks';
import styled from 'styled-components';

function MainPage() {
  const condition = useSelector(
    (state: { product: ProductStoreState }) => state.product.condition
  );
  const productList = useSelector(
    (state: { product: ProductStoreState }) => state.product.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (productList.length < 1) {
      getProducts(dispatch);
    }
  }, [dispatch, productList]);

  const renderSwitch = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Message>Loading...</Message>;
      case CONDITION.COMPLETE:
        return <ProductCardGrid productList={productList} />;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  }, [condition, productList]);

  return <StyledPage>{renderSwitch()}</StyledPage>;
}

const StyledPage = styled.div`
  margin: 60px 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  font-size: 25px;
`;

export default MainPage;
