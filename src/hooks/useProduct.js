import { useDispatch, useSelector } from 'react-redux';
import { getProductAsync } from 'reducers/product/product.thunks';
import { useParams } from 'react-router-dom';
import { addCartItem } from 'reducers/cart/cart.actions';
import { useEffect } from 'react';

const useProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, isError, data } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [id]);

  const handleAddCart = () => {
    dispatch(addCartItem({ ...data, quantity: 1 }));
  };

  return { isLoading, isError, data, handleAddCart };
};

export default useProduct;
