import useReduxState from './useReduxState';
import {
  addShoppingBasketProduct,
  deleteShoppingBasketProduct,
  increaseShoppingBasketProduct,
  decreaseShoppingBasketProduct,
} from 'actions/shoppingBasket';

function useShoppingBasket(stateKey) {
  const {
    state: { shoppingBasketList },
    dispatch,
  } = useReduxState(stateKey);

  const checkIsContainedProduct = productId => {
    return shoppingBasketList.find(productInfo => productInfo.id === productId) !== undefined;
  };

  const addProduct = productInfo => {
    dispatch(addShoppingBasketProduct(productInfo));
  };

  const deleteProducts = idList => {
    dispatch(deleteShoppingBasketProduct(idList));
  };

  const increaseQuantity = id => {
    dispatch(increaseShoppingBasketProduct(id));
  };

  const decreaseQuantity = id => {
    dispatch(decreaseShoppingBasketProduct(id));
  };

  return {
    shoppingBasketList,
    checkIsContainedProduct,
    addProduct,
    deleteProducts,
    increaseQuantity,
    decreaseQuantity,
  };
}

export default useShoppingBasket;
