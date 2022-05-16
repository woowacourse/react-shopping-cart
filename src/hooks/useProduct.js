import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useReduxState from 'hooks/useReduxState';
// import { addCart } from 'reducers/cart/cart.actions';
import { getProductAsync } from 'reducers/product/product.thunks';
import { addCartAsync } from 'reducers/cart/cart.thunks';

const useProduct = () => {
  const { dispatch, isLoading, data, isError } = useReduxState('product');

  const { cartList } = useReduxState('product');
  console.log('cartList', cartList);

  const { id } = useParams();

  const addCartItem = () => {
    // dispatch(addCart({ ...data, quantity: 1 }));
    dispatch(addCartAsync(id));
  };

  const getProductEffect = () => {
    useEffect(() => {
      dispatch(getProductAsync(id));
    }, [id]);
  };

  return { getProductEffect, addCartItem, product: data, isLoading, isError };
};

export default useProduct;
