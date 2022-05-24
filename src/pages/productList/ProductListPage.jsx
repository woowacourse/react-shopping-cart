import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProductItem from 'components/productItem/ProductItem';

import { getProductList } from 'middlewares/products';
import { getShoppingCartList } from 'middlewares/shoppingCarts';

import { StyledProductListPage, StyledProductList } from 'pages/productList/style';
import { getSkeletonList } from 'components/productItem/Skeleton';

const ProductListPage = () => {
  const { productList, productListLoading } = useSelector(state => state.productReducer.products);
  const { shoppingCartList } = useSelector(state => state.shoppingCartReducer.shoppingCarts);
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
          {productList.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              cartItem={shoppingCartList.find(cartItem => cartItem.id === product.id)}
            />
          ))}
        </StyledProductList>
      </StyledProductListPage>
    );
  }
};

export default ProductListPage;
