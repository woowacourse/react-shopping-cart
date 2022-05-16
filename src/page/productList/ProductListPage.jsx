import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import ProductItem from 'components/productItem/ProductItem';

import store from 'store/store';
import { doInitializeCart } from 'actions/actionCreator';

import Styled from 'page/productList/style';
import { SERVER_URL } from 'constants';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);

  const getProducts = async () => {
    const response = await axios.get(SERVER_URL + 'products');

    store.dispatch(doInitializeCart({ products: response.data }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Styled.ProductListPage>
      <Styled.ProductList>
        {products.map(({ id }) => id && <ProductItem key={id} id={id} />)}
      </Styled.ProductList>
    </Styled.ProductListPage>
  );
};

export default ProductListPage;
