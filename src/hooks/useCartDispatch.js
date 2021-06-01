import { useDispatch } from 'react-redux';
import { cartAction } from '../redux';

export const useCartDispatch = () => {
  const dispatch = useDispatch();

  const getProducts = () => dispatch(cartAction.getProducts());
  const addProduct = (product) => dispatch(cartAction.addProduct(product));
  const removeProduct = (id) => dispatch(cartAction.removeProduct(id));
  const removeSelectedProducts = (selectedProducts) =>
    dispatch(cartAction.removeSelectedProducts(selectedProducts));
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
    removeSelectedProducts,
    toggleProductSelection,
    toggleAllProductsSelection,
    incrementProductQuantity,
    decrementProductQuantity,
    inputProductQuantity,
  };
};
