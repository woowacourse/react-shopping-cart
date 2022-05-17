import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import store from 'store/store';
import { initProduct, initShoppingCart } from 'actions/actionCreator';
import { getProductList, getShoppingCartList } from 'utils/api';

import { StyledProductListPage, StyledProductList } from 'pages/productList/style';

const ProductListPage = () => {
  const { products } = useSelector(state => state.reducer);

  const getProducts = async () => {
    const productList = await getProductList();
    const shoppingCartList = await getShoppingCartList();
    store.dispatch(initProduct({ products: productList }));
    store.dispatch(initShoppingCart({ shoppingCart: shoppingCartList }));
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
