import produce from 'immer';
import { combineReducers } from 'redux';
import { ACTION_TYPE, PRODUCT } from '../constants';

const initialState = {
  cartItems: [],
};

const addInitialProductToCart = (state, { product, cartId }) => {
  const { cartItems } = state;
  const { product_id } = product;
  const index = cartItems.findIndex(item => item.product_id === product_id);
  const newIndex = index === -1 ? cartItems.length : index;
  console.log(state);
  console.log(cartItems);
  const updater = produce(draft => {
    draft.cartItems[newIndex] = {
      cart_id: Number(cartId),
      ...product,
      quantity: 1,
      isChecked: true,
    };
  });

  console.log(updater(state));
  return updater(state);
};

const addToCart = (state, product) => {
  const { cartItems } = state;
  const { product_id } = product;
  const cartItem = cartItems.find(item => item.product_id === product_id);

  const index = cartItems.findIndex(item => item.product_id === product_id);
  const newIndex = index === -1 ? cartItems.length : index;

  const updater = produce(draft => {
    draft.cartItems[newIndex] = {
      cart_id: cartItem.cart_id,
      ...product,
      quantity: cartItems[index].quantity + 1,
      isChecked: true,
    };
  });

  return updater(state);
};

const deleteProduct = (state, id) => {
  const { cartItems } = state;
  const newProducts = [...cartItems];

  newProducts.splice(id, 1);

  const updater = produce(draft => {
    draft.cartItems = newProducts;
  });

  return updater(state);
};

const changeQuantity = (state, id, operand) => {
  const { cartItems } = state;
  const product = cartItems.find(item => item.product_id === id);
  const index = cartItems.findIndex(item => item.product_id === id);

  const prevQuantity = product.quantity;

  const newQuantity =
    prevQuantity < PRODUCT.QUANTITY.MIN || prevQuantity > PRODUCT.QUANTITY.MAX
      ? prevQuantity
      : prevQuantity + operand;

  const newProduct = {
    ...product,
    quantity: newQuantity,
    isChecked: true,
  };

  const updater = produce(draft => {
    draft.cartItems[index] = newProduct;
  });

  return updater(state);
};

const toggleChecked = (state, id) => {
  const { cartItems } = state;
  const product = cartItems.find(product => product.product_id === id);
  const index = cartItems.findIndex(product => product.product_id === id);

  const newProduct = {
    ...product,
    isChecked: !product.isChecked,
  };

  const updater = produce(draft => {
    draft.cartItems[index] = newProduct;
  });

  return updater(state);
};

const toggleCheckedAll = (state, isChecked) => {
  const { cartItems } = state;
  const newProducts = [];

  Object.values(cartItems).forEach(product => {
    newProducts.push({
      ...product,
      isChecked: !isChecked,
    });
  });

  return {
    ...state,
    cartItems: newProducts,
  };
};

const deleteProductChecked = state => {
  const { cartItems } = state;
  const newProducts = [];

  Object.values(cartItems).forEach(product => {
    if (!product.isChecked) {
      newProducts.push({
        ...product,
        isChecked: true,
      });
    }
  });

  const updater = produce(draft => {
    draft.cartItems = newProducts;
  });

  return updater(state);
};

const setCarts = (state, cartItems) => {
  const newCartItems = cartItems.map(item => {
    return { ...item, isChecked: true, quantity: 1 };
  });

  const updater = produce(draft => {
    draft.cartItems = newCartItems;
  });

  return updater(state);
};

const resetCarts = state => {
  const updater = produce(draft => {
    draft.cartItems = [];
  });

  return updater(state);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.PRODUCTS.ADD_TO_CART:
      return addToCart(state, action.payload);

    case ACTION_TYPE.PRODUCTS.DELETE:
      return deleteProduct(state, action.index);

    case ACTION_TYPE.PRODUCTS.INCREASE_QUANTITY:
      return changeQuantity(state, action.id, 1);

    case ACTION_TYPE.PRODUCTS.DECREASE_QUANTITY:
      return changeQuantity(state, action.id, -1);

    case ACTION_TYPE.PRODUCTS.TOGGLE_CHECKED:
      return toggleChecked(state, action.id);

    case ACTION_TYPE.PRODUCTS.TOGGLE_ENTIRE_CHECKED:
      return toggleCheckedAll(state, action.isChecked);

    case ACTION_TYPE.PRODUCTS.DELETE_CHECKED:
      return deleteProductChecked(state);

    case ACTION_TYPE.PRODUCTS.SET_CARTS:
      return setCarts(state, action.cartItems);

    case ACTION_TYPE.PRODUCTS.RESET_CARTS:
      return resetCarts(state);

    case ACTION_TYPE.PRODUCTS.ADD_INITIAL_PRODUCT:
      return addInitialProductToCart(state, action.payload);

    default:
      return state;
  }
};

export default combineReducers({ cart: cartReducer });
