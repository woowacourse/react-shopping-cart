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

  const dispatchShoppingBasketAction = (productInfo, isContained) => {
    dispatch(
      isContained
        ? deleteShoppingBasketProduct(productInfo.id)
        : addShoppingBasketProduct(productInfo)
    );
  };

  return {
    shoppingBasketList,
    checkIsContainedProduct,
    dispatchShoppingBasketAction,
  };
}

export default useShoppingBasket;
