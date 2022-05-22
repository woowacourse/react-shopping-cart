import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import { getProductList } from 'modules/products';
import { getShoppingCartList } from 'modules/shoppingCarts';

import { StyledProductListPage, StyledProductList } from 'pages/productList/style';

const ProductListPage = () => {
  const { productList } = useSelector(state => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getShoppingCartList());
  }, [dispatch]);

  return (
    <StyledProductListPage>
      <StyledProductList>
        {productList.map(({ id }) => (
          <ProductItem key={id} id={id} />
        ))}
      </StyledProductList>
    </StyledProductListPage>
  );
};

export default ProductListPage;
