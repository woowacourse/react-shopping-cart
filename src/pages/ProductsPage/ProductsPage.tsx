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
import { RootState } from '../../modules';
import { addCartItemRequest, getCartItemsRequest } from '../../modules/cartItems/actions';
import { CartState } from '../../modules/cartItems/reducers';
import api from '../../api';

const ProductsPage = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);

  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<T.Product[]>([]);
  const getProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_PRODUCTS_FAILURE);
    }

    setLoading(false);
  }, [enqueueSnackbar]);

  const handleClickCart = (product: T.Product) => {
    if (isLoading || cartItems.status !== T.AsyncStatus.SUCCESS) return;

    const cartItemIds = cartItems.data.map((cartItem) => cartItem.product.id);

    if (cartItemIds.includes(product.id)) {
      enqueueSnackbar(MESSAGE.EXIST_CART_ITEM);
      return;
    }

    dispatch(addCartItemRequest(product))
      .then(() => {
        enqueueSnackbar(MESSAGE.ADDED_CART_ITEM_SUCCESS);
      })
      .catch((error: Error) => {
        enqueueSnackbar(error.message);
      });
  };

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, [getProducts]);

  return (
    <Styled.Root>
      {isLoading ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.ProductList>
          {products?.map((product: T.Product) => (
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
