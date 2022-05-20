import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import { getProductList } from 'modules/products';
import { getShoppingCartList } from 'modules/shoppingCarts';

import { StyledProductListPage, StyledProductList } from 'pages/productList/style';

const ProductListPage = () => {
  const { productList, productListLoading, productListError } = useSelector(
    state => state.productReducer.products,
  );
  const { shoppingCartListLoading, shoppingCartListError } = useSelector(
    state => state.shoppingCartReducer.shoppingCarts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getShoppingCartList());
  }, [dispatch]);

  if (productListLoading || shoppingCartListLoading) return <div>로딩중...</div>;
  if (productListError || shoppingCartListError) return <div>에러 발생!</div>;
  if (productList.length === 0) return null;

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
