import React, { useCallback, useEffect, useState } from 'react';
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
import api from '../../api';
import API from '../../constants/api';
import { toCamelCaseKeyObjectArray } from '../../utils';

const ProductsPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<T.Product[]>([]);

  const getProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(API.PRODUCTS);
      const serializedProducts = toCamelCaseKeyObjectArray(response.data);

      setProducts(serializedProducts);
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_PRODUCTS_FAILURE);
    }

    setLoading(false);
  }, [enqueueSnackbar]);

  const handleClickCart = (productId: T.Product['productId']) => {
    if (isLoading || cartItems.status === T.AsyncStatus.PENDING) return;

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
      .catch((error: Error) => {
        enqueueSnackbar(error.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, [getProducts]);

  return (
    <Styled.Root>
      {isLoading && (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      )}
      {!isLoading && products.length <= 0 ? (
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
