import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import store from 'store/store';
import { initializeCart } from 'actions/actionCreator';
import { getProductList } from 'api';

import { StyledProductListPage, StyledProductList } from 'page/productList/style';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);
  const getProducts = async () => {
    const productList = await getProductList();
    store.dispatch(initializeCart({ products: productList }));
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
