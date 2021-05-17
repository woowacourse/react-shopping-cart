import { ACTION_TYPE, PRODUCT } from '../constants';

const initialState = {
  pickedProducts: {},
};

const addToCart = (state, product) => {
  const { pickedProducts } = state;
  const { id } = product;
  const newQuantity =
    id in pickedProducts ? pickedProducts[id].quantity + 1 : 1;

  return {
    ...state,
    pickedProducts: {
      ...pickedProducts,
      [id]: {
        ...product,
        quantity: newQuantity,
        isChecked: true,
      },
    },
  };
};

const changeQuantity = (state, id, operand) => {
  const { pickedProducts } = state;
  const prevQuantity = pickedProducts[id].quantity;
  const newQuantity = prevQuantity + operand;

  return {
    ...state,
    pickedProducts: {
      ...pickedProducts,
      [id]: {
        ...pickedProducts[id],
        quantity:
          newQuantity < PRODUCT.QUANTITY.MIN ||
          newQuantity > PRODUCT.QUANTITY.MAX
            ? prevQuantity
            : newQuantity,
      },
    },
  };
};

const toggleChecked = (state, id) => {
  const { pickedProducts } = state;

  return {
    ...state,
    pickedProducts: {
      ...pickedProducts,
      [id]: {
        ...pickedProducts[id],
        isChecked: !pickedProducts[id].isChecked,
      },
    },
  };
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

  return {
    ...state,
    pickedProducts: newProducts,
  };
};

const deleteProduct = (state, id) => {
  const { pickedProducts } = state;
  const newProducts = { ...pickedProducts };

  delete newProducts[id];

  return {
    ...state,
    pickedProducts: newProducts,
  };
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
