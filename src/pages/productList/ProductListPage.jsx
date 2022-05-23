import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import { getProductList } from 'modules/products';
import { getShoppingCartList } from 'modules/shoppingCarts';

import { StyledProductListPage, StyledProductList } from 'pages/productList/style';
import { getSkeletonList } from 'components/productItem/Skeleton';

const ProductListPage = () => {
  const { productList, productListLoading } = useSelector(state => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList());
    dispatch(getShoppingCartList());
  }, [dispatch]);

  if (productListLoading) {
    return (
      <StyledProductListPage>
        <StyledProductList>{getSkeletonList(12)}</StyledProductList>
      </StyledProductListPage>
    );
  }

  if (productList.length > 0) {
    return (
      <StyledProductListPage>
        <StyledProductList>
          {productList.map(({ id }) => (
            <ProductItem key={id} id={id} />
          ))}
        </StyledProductList>
      </StyledProductListPage>
    );
  }
};

export default ProductListPage;
