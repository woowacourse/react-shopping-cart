import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import MESSAGE from 'constants/messages';
import Spinner from 'components/shared/Spinner/Spinner';
import ProductItem from 'components/units/ProductItem/ProductItem';
import { RootState } from 'modules';
import { getCartItemsRequest } from 'modules/cartItems/actions';
import api from 'api';
import useAddCart from 'hooks/useAddCart';
import { Product } from 'types';
import Styled from './ProductsPage.styles';

const ProductsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const addCartItem = useAddCart();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

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

  const handleClickCart = (product: Product) => {
    addCartItem(product);
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
          {products?.map((product: Product) => (
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
