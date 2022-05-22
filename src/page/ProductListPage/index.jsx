import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { ProductItem } from 'components';

import store from 'store/store';
import { doInitializeCart } from 'actions/actionCreator';

import Styled from 'page/ProductListPage/index.style';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);

  const getProducts = useCallback(async () => {
    if (products.length > 0) return;

    const response = await axios.get('products');

    store.dispatch(doInitializeCart({ products: response.data }));
  }, [products]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Styled.ProductListPage>
      {products.length > 0 ? (
        <Styled.ProductList>
          {products.map(({ id }) => id && <ProductItem key={id} id={id} />)}
        </Styled.ProductList>
      ) : (
        <Styled.Loading>열심히 로딩중 .. ✨</Styled.Loading>
      )}
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
