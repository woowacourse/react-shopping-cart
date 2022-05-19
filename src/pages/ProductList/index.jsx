import { useEffect } from 'react';
import { getProductList } from 'actions/products';
import { addCartList } from 'actions/cart';

import useReduxState from 'hooks/useReduxState';

import { SwitchAsync, Case } from 'components/@common/SwitchAsync';
import StatusMessage from 'components/@common/StatusMessage';
import ProductItem from 'components/ProductItem';

import * as Styled from './styles';

export function ProductList() {
  const { state, dispatch } = useReduxState('products');
  const { content: products, isLoading, error: errorMessage } = state.productInfo;

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const handleAddCart = ({ id, image, name, price }) => {
    dispatch(addCartList({ id, image, name, price }));
    alert(`${name}가 장바구니에 추가되었습니다 🧺`);
  };

  return (
    <SwitchAsync
      isLoading={isLoading}
      isError={!!errorMessage}
      isContentLoaded={products.length > 0}
    >
      <Case.Success>
        <Styled.ProductListWrapper>
          {products &&
            products.map(({ id, name, goodsPrice, listImage }) => (
              <ProductItem
                key={id}
                id={id}
                image={listImage}
                name={name}
                price={goodsPrice}
                onClick={handleAddCart}
              />
            ))}
        </Styled.ProductListWrapper>
      </Case.Success>

      <Case.Loading>
        <StatusMessage status="loading">상품 목록을 불러오고 있습니다.</StatusMessage>
      </Case.Loading>

      <Case.Error>
        <StatusMessage status="error">{errorMessage}</StatusMessage>
      </Case.Error>
    </SwitchAsync>
  );
}
export default ProductList;
