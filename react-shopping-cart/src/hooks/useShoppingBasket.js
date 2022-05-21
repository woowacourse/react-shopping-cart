import useReduxState from './useReduxState';
import { addShoppingBasketProduct, deleteShoppingBasketProduct } from 'actions/shoppingBasket';

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

  return {
    shoppingBasketList,
    checkIsContainedProduct,
    addProduct,
    deleteProducts,
  };
}

export default useShoppingBasket;
