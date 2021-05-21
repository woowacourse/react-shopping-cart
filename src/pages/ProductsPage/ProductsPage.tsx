import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Styled from './ProductsPage.styles';
import * as T from '../../types';
import MESSAGE from '../../constants/messages';
import Spinner from '../../components/shared/Spinner/Spinner';
import ProductItem from '../../components/units/ProductItem/ProductItem';
import { RootState } from '../../modules';
import { addCartItemRequest, getCartItemsRequest } from '../../modules/cartItems/actions';
import { CartState } from '../../modules/cartItems/reducers';
import useAxios from '../../hooks/useAxios';

const ProductsPage = (): ReactElement => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [{ data: products, status, error }, fetchProducts] = useAxios('/products');

  const handleClickCart = (product: T.Product) => {
    if (status !== T.AsyncStatus.SUCCESS || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.product.id);

    if (cartItemIds.includes(product.id)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(product))
      .then(() => {
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      await fetchProducts();
    };
    getProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(MESSAGE.GET_PRODUCTS_FAILURE);
    }
  }, [enqueueSnackbar, error]);

  return (
    <Styled.Root>
      {status === T.AsyncStatus.PENDING && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}
      {status === T.AsyncStatus.SUCCESS && products?.length === 0 ? (
        <Styled.NoResultMessage>😢 지금은 구입할 수 있는 상품이 없어요!</Styled.NoResultMessage>
      ) : (
        <Styled.ProductList>
          {products?.map?.((product: T.Product) => (
            <li key={product.id}>
              <ProductItem product={product} onClickCart={handleClickCart} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
