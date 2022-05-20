export const ADD_SHOPPING_BASKET_PRODUCT = 'ADD_SHOPPING_BASKET_PRODUCT';

export const DELETE_SHOPPING_BASKET_PRODUCT = 'DELETE_SHOPPING_BASKET_PRODUCT';

export const addShoppingBasketProduct = productInfo => ({
  type: ADD_SHOPPING_BASKET_PRODUCT,
  payload: { ...productInfo },
});

export const deleteShoppingBasketProduct = id => ({
  type: DELETE_SHOPPING_BASKET_PRODUCT,
  payload: { id },
});
