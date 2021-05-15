import React, { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import * as T from 'types';
import MESSAGE from 'constants/messages';
import Spinner from 'components/shared/Spinner/Spinner';
import ProductItem from 'components/units/ProductItem/ProductItem';
import useAddCartItem from 'hooks/useAddCartItem';
import api from 'api';
import Styled from './ProductsPage.styles';

const ProductsPage = () => {
  const history = useHistory();
  const addCartItem = useAddCartItem();

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

  const handleClickItem = (product: T.Product) => {
    history.push({
      pathname: '/products/detail',
      state: { product },
    });
  };

  const handleClickCart = (product: T.Product) => {
    addCartItem(product, isLoading);
  };

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
              <ProductItem product={product} onClickItem={handleClickItem} onClickCart={handleClickCart} />
            </li>
          ))}
        </Styled.ProductList>
      )}
    </Styled.Root>
  );
};

export default ProductsPage;
