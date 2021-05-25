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
import { RootState } from '../../store';
import { addCartItem, getCartItems } from '../../slices/cartSlice';
import useAxios from '../../hooks/useAxios';
import API from '../../constants/api';

const ProductsPage = (): ReactElement => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [{ data: products, status, error }, fetchProducts] = useAxios(API.PRODUCTS);

  const handleClickCart = (productId: T.Product['productId']) => {
    if (status !== T.AsyncStatus.SUCCESS || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.productId);

    if (cartItemIds.includes(productId)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItem(productId))
      .then(() => {
        dispatch(getCartItems());
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((err: Error) => {
        enqueueSnackbar(err.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItems());
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
            <li key={product.productId}>
              <ProductItem product={product} onClickCart={handleClickCart} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
