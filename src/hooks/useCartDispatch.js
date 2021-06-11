import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { cartAction } from '../redux';

export const useCartDispatch = () => {
  const dispatch = useDispatch();

  const getProducts = useCallback(() => dispatch(cartAction.getProducts()), [dispatch]);
  const addProduct = (product) => dispatch(cartAction.addProduct(product));
  const removeProduct = (id) => dispatch(cartAction.removeProduct(id));
  const removeProducts = (ids) => dispatch(cartAction.removeProducts(ids));
  const toggleProductSelection = (id) => dispatch(cartAction.toggleProductSelection(id));
  const toggleAllProductsSelection = ({ target: { checked } }) => {
    dispatch(cartAction.toggleAllProductsSelection(checked));
  };
  const incrementProductQuantity = (id) => dispatch(cartAction.incrementProductQuantity(id));
  const decrementProductQuantity = (id) => dispatch(cartAction.decrementProductQuantity(id));
  const inputProductQuantity = (id, quantity) =>
    dispatch(cartAction.inputProductQuantity(id, quantity));

  return {
    getProducts,
    addProduct,
    removeProduct,
    removeProducts,
    toggleProductSelection,
    toggleAllProductsSelection,
    incrementProductQuantity,
    decrementProductQuantity,
    inputProductQuantity,
  };
};
