export const ADD_SHOPPING_BASKET_PRODUCT = 'ADD_SHOPPING_BASKET_PRODUCT';

export const DELETE_SHOPPING_BASKET_PRODUCT = 'DELETE_SHOPPING_BASKET_PRODUCT';

export const INCREASE_SHOPPING_BASKET_PRODUCT = 'INCREASE_SHOPPING_BASKET_PRODUCT';

export const DECREASE_SHOPPING_BASKET_PRODUCT = 'DECREASE_SHOPPING_BASKET_PRODUCT';

export const addShoppingBasketProduct = productInfo => ({
  type: ADD_SHOPPING_BASKET_PRODUCT,
  payload: { ...productInfo },
});

export const deleteShoppingBasketProduct = idList => ({
  type: DELETE_SHOPPING_BASKET_PRODUCT,
  payload: { idList },
});

export const increaseShoppingBasketProduct = id => ({
  type: INCREASE_SHOPPING_BASKET_PRODUCT,
  payload: { id },
});

export const decreaseShoppingBasketProduct = id => ({
  type: DECREASE_SHOPPING_BASKET_PRODUCT,
  payload: { id },
});
