import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styled from './ProductsPage.styles';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import Spinner from '../../components/shared/Spinner/Spinner';
import ProductItem from '../../components/units/ProductItem/ProductItem';
import { RootState } from '../../modules';
import { getProductsRequest } from '../../modules/products/actions';
import { addCartItemRequest } from '../../modules/cartItems/actions';
import { ProductsState } from '../../modules/products/reducers';
import { CartState } from '../../modules/cartItems/reducers';
import useSnackbar from '../../hooks/useSnackbar';

const ProductsPage = () => {
  const { Snackbar, openSnackbar } = useSnackbar();
  const products: ProductsState['products'] = useSelector((state: RootState) => state.productsReducer.products);

  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);

  const dispatch = useDispatch();

  const handleClickCart = (product: T.Product) => {
    if (cartItems.isLoading) return;

    dispatch(addCartItemRequest(product));

    if (cartItems.error) {
      openSnackbar(cartItems.error.message);
    } else {
      openSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
    }
  };

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  return (
    <Styled.Root>
      {products.isLoading ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.ProductList>
          {products.data.map((product: T.Product) => (
            <li key={product.id}>
              <ProductItem product={product} onClickCart={handleClickCart} />
            </li>
          ))}
        </Styled.ProductList>
      )}
      <Snackbar />
    </Styled.Root>
  );
};

export default ProductsPage;
