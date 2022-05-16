import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import ProductItem from 'components/productItem/ProductItem';

import store from 'store/store';
import { initializeCart } from 'actions/actionCreator';

import { StyledProductListPage, StyledProductList } from 'page/productList/style';
import { SERVER_URL } from 'constants';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);

  const getProducts = async () => {
    const response = await axios.get(SERVER_URL + 'products');

    store.dispatch(initializeCart({ products: response.data }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <StyledProductListPage>
      <StyledProductList>
        {products.map(({ id }) => (
          <ProductItem key={id} id={id} />
        ))}
      </StyledProductList>
    </StyledProductListPage>
  );
};

export default ProductListPage;
