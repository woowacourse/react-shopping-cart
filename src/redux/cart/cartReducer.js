import ACTION_TYPE from 'redux/cart/cartActions';
import { findElementIndex, getObjectArrayValuesOfKey, removeElement, updateObject } from 'utils';

const initialState = {
  products: [],
  checkedProducts: [],
};

const addProductToCart = (state, { payload }) => {
  const { products, checkedProducts } = state;
  const targetProductIdx = findElementIndex(products, 'id', payload.id);

  if (targetProductIdx !== -1) {
    const newProducts = [...products];

    newProducts[targetProductIdx].quantity += 1;

    return updateObject(state, { products: newProducts });
  }

  return updateObject(state, {
    products: products.concat({ ...payload, quantity: 1 }),
    checkedProducts: checkedProducts.concat({ id: payload.id }),
  });
};

const subtractCartProductQuantity = (state, { payload }) => {
  const { products } = state;
  const newProducts = [...products];
  const targetProductIdx = findElementIndex(products, 'id', payload.id);

  newProducts[targetProductIdx].quantity -= 1;

  return updateObject(state, { products: newProducts });
};

const toggleAllCartProductsCheck = (state, { payload }) => {
  return updateObject(state, { checkedProducts: payload.checked ? state.products : [] });
};

const toggleCartProductCheck = (state, { payload }) => {
  const { checkedProducts } = state;
  const isCheckedProduct = checkedProducts.find(product => product.id === payload.id);

  if (isCheckedProduct) {
    return updateObject(state, { checkedProducts: removeElement(checkedProducts, payload.id) });
  }

  return updateObject(state, { checkedProducts: checkedProducts.concat({ id: payload.id }) });
};

const removeSelectedProductsFromCart = state => {
  const { products, checkedProducts } = state;
  const checkedProductIds = getObjectArrayValuesOfKey(checkedProducts, 'id');

  return updateObject(state, {
    products: products.filter(product => !checkedProductIds.includes(product.id)),
    checkedProducts: [],
  });
};

const removeProductFromCart = (state, { payload }) => {
  return updateObject(state, {
    products: removeElement(state.products, payload.id),
    checkedProducts: removeElement(state.checkedProducts, payload.id),
  });
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.ADD_PRODUCT_TO_CART:
      return addProductToCart(state, action);
    case ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY:
      return subtractCartProductQuantity(state, action);
    case ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK:
      return toggleAllCartProductsCheck(state, action);
    case ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK:
      return toggleCartProductCheck(state, action);
    case ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART:
      return removeSelectedProductsFromCart(state);
    case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART:
      return removeProductFromCart(state, action);
    default:
      return state;
  }
}

export default cartReducer;

export { initialState };
