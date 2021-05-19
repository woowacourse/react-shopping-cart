import produce from 'immer';
import { ACTION_TYPE, PRODUCT } from '../constants';

const initialState = {
  pickedProducts: {},
};

const addToCart = (state, product) => {
  const { pickedProducts } = state;
  const { id } = product;
  const newQuantity =
    id in pickedProducts ? pickedProducts[id].quantity + 1 : 1;

  const updater = produce(draft => {
    draft.pickedProducts[id] = {
      ...product,
      quantity: newQuantity,
      isChecked: true,
    };
  });

  return updater(state);
};

const changeQuantity = (state, id, operand) => {
  const { pickedProducts } = state;

  const prevQuantity = pickedProducts[id].quantity;
  const newQuantity =
    prevQuantity < PRODUCT.QUANTITY.MIN || prevQuantity > PRODUCT.QUANTITY.MAX
      ? prevQuantity
      : prevQuantity + operand;

  const updater = produce(draft => {
    draft.pickedProducts[id] = {
      ...pickedProducts[id],
      quantity: newQuantity,
    };
  });

  return updater(state);
};

const toggleChecked = (state, id) => {
  const { pickedProducts } = state;

  const updater = produce(draft => {
    draft.pickedProducts[id] = {
      ...pickedProducts[id],
      isChecked: !pickedProducts[id].isChecked,
    };
  });

  return updater(state);
};

const toggleCheckedAll = (state, isChecked) => {
  const { pickedProducts } = state;
  const newProducts = {};

  Object.values(pickedProducts).forEach(product => {
    newProducts[product.id] = {
      ...product,
      isChecked: !isChecked,
    };
  });

  return {
    ...state,
    pickedProducts: newProducts,
  };
};

const deleteCheckedProducts = state => {
  const { pickedProducts } = state;
  const newProducts = {};

  Object.values(pickedProducts).forEach(product => {
    if (!product.isChecked) {
      newProducts[product.id] = {
        ...product,
      };
    }
  });

  const updater = produce(draft => {
    draft.pickedProducts = newProducts;
  });

  return updater(state);
};

const deleteProduct = (state, id) => {
  const { pickedProducts } = state;
  const newProducts = { ...pickedProducts };

  delete newProducts[id];

  const updater = produce(draft => {
    draft.pickedProducts = newProducts;
  });

  return updater(state);
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.PRODUCTS.ADD_TO_CART:
      return addToCart(state, action.product);

    case ACTION_TYPE.PRODUCTS.INCREASE_QUANTITY:
      return changeQuantity(state, action.id, 1);

    case ACTION_TYPE.PRODUCTS.DECREASE_QUANTITY:
      return changeQuantity(state, action.id, -1);

    case ACTION_TYPE.PRODUCTS.TOGGLE_CHECKED:
      return toggleChecked(state, action.id);

    case ACTION_TYPE.PRODUCTS.TOGGLE_ENTIRE_CHECKED:
      return toggleCheckedAll(state, action.isChecked);

    case ACTION_TYPE.PRODUCTS.DELETE_CHECKED:
      return deleteCheckedProducts(state);

    case ACTION_TYPE.PRODUCTS.DELETE:
      return deleteProduct(state, action.id);

    default:
      return state;
  }
};

export default productReducer;
