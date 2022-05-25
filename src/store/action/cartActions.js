import cookieStorage from 'storage/cookieStorage';

const CART_ACTION_TYPES = {
  ADD_PRODUCT: 'CART_ADD_PRODUCT',
  SUBTRACT_PRODUCT: 'SUBTRACT_PRODUCT',
  CHECK_PRODUCT: 'CHECK_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  REMOVE_SELECTED_PRODUCT: 'REMOVE_SELECTED_PRODUCT',
};

const addProductCart = product => {
  return {
    type: CART_ACTION_TYPES.ADD_PRODUCT,
    payload: {
      product,
    },
  };
};

const subtractProductCart = product => {
  return {
    type: CART_ACTION_TYPES.SUBTRACT_PRODUCT,
    payload: {
      product,
    },
  };
};

const checkProductCart = (product, checked) => {
  return {
    type: CART_ACTION_TYPES.CHECK_PRODUCT,
    payload: {
      product,
      checked,
    },
  };
};

const removeProductCart = product => {
  cookieStorage.removeCartProductId(product.id);
  return {
    type: CART_ACTION_TYPES.REMOVE_PRODUCT,
    payload: {
      product,
    },
  };
};

const removeSelectedProductCart = productList => {
  const idList = productList.map(product => product.id);
  cookieStorage.removeSelectedProductId(idList);
  return {
    type: CART_ACTION_TYPES.REMOVE_SELECTED_PRODUCT,
    payload: {
      productIdList: idList,
    },
  };
};

export {
  CART_ACTION_TYPES,
  addProductCart,
  subtractProductCart,
  checkProductCart,
  removeProductCart,
  removeSelectedProductCart,
};
