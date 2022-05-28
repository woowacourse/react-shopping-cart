import updateObject from 'modules/reducerUtilities';

const REQUEST_CART_ADD = 'REQUEST_CART_ADD';
const REQUEST_CART_ADD_FAIL = 'REQUEST_CART_ADD_FAIL';
const REQUEST_EXIST_PRODUCT_ADD = 'REQUEST_EXIST_PRODUCT_ADD';
const REQUEST_PRODUCT_DELETE = 'REQUEST_PRODUCT_DELETE';
const REQUEST_CHECKED_PRODUCT_DELETE = 'REQUEST_CHECKED_PRODUCT_DELETE';
const REQUEST_PRODUCT_CHECK = 'REQUEST_PRODUCT_CHECK';
const REQUEST_PRODUCT_ALL_CHECK = 'REQUEST_PRODUCT_ALL_CHECK';
const REQUEST_ALL_CHECKBOX_TRUE = 'REQUEST_ALL_CHECKBOX_TRUE';
const REQUEST_ALL_CHECKBOX_FALSE = 'REQUEST_ALL_CHECKBOX_FALSE';
const REQUEST_EXIST_PRODUCT_DECREASE = 'REQUEST_EXIST_PRODUCT_DECREASE';
const REQUEST_UPDATE_PRODUCT_QUANTITY = 'REQUEST_UPDATE_PRODUCT_QUANTITY';

// action 생성 함수
export const requestCartAdd = (product) => ({ type: REQUEST_CART_ADD, product });
export const requestExistProductAdd = (productIdx, inputQuantity) => ({
  type: REQUEST_EXIST_PRODUCT_ADD,
  productIdx,
  inputQuantity,
});
export const requestCartAddFail = (error) => ({ type: REQUEST_CART_ADD_FAIL, error });
export const requestProductDelete = (productIdx) => ({ type: REQUEST_PRODUCT_DELETE, productIdx });
export const requestCheckedProductDelete = () => ({ type: REQUEST_CHECKED_PRODUCT_DELETE });
export const requestProductCheck = (productIdx) => ({ type: REQUEST_PRODUCT_CHECK, productIdx });
export const requestProductAllCheck = () => ({ type: REQUEST_PRODUCT_ALL_CHECK });
export const requestAllCheckboxTrue = () => ({ type: REQUEST_ALL_CHECKBOX_TRUE });
export const requestAllCheckboxFalse = () => ({ type: REQUEST_ALL_CHECKBOX_FALSE });
export const requestExistProductDecrease = (productIdx) => ({
  type: REQUEST_EXIST_PRODUCT_DECREASE,
  productIdx,
});
export const requestUpdateProductQuantity = (productIdx, newQuantity) => ({
  type: REQUEST_UPDATE_PRODUCT_QUANTITY,
  productIdx,
  newQuantity,
});

// state
const initialState = {
  carts: [],
  errorMessage: '',
  isCheckedAll: false,
};

// case reducer
const setStateCartAdd = (state, action) => {
  return updateObject(state, {
    carts: [
      ...state.carts,
      { ...action.product, quantity: 1, isChecked: true, total: action.product.price },
    ],
  });
};

const setStateCartAddFail = (state, action) => {
  return updateObject(state, {
    errorMessage: action.error,
  });
};

const setStateExistProductAdd = (state, action) => {
  const newCarts = [...state.carts];
  newCarts[action.productIdx].quantity += 1;
  newCarts[action.productIdx].total =
    newCarts[action.productIdx].price * newCarts[action.productIdx].quantity;

  return updateObject(state, {
    carts: newCarts,
  });
};

const setStateExistProductDecrease = (state, action) => {
  const newCarts = [...state.carts];
  newCarts[action.productIdx].quantity -= 1;
  newCarts[action.productIdx].total -= newCarts[action.productIdx].price;

  return updateObject(state, { carts: newCarts });
};

const setStateUpdateProductQuantity = (state, action) => {
  const newCarts = [...state.carts];
  newCarts[action.productIdx].quantity = action.newQuantity;
  newCarts[action.productIdx].total = newCarts[action.productIdx].price * action.newQuantity;

  return updateObject(state, { carts: newCarts });
};

const setStateProductDelete = (state, action) => {
  const newCarts = [...state.carts];
  newCarts.splice(action.productIdx, 1);

  return updateObject(state, {
    carts: newCarts,
  });
};

const setStateCheckedProductDelete = (state) => {
  const newCarts = [...state.carts];
  const checkedProductIdx = newCarts
    .reduce((a, e, i) => {
      if (e.isChecked === true) {
        a.push(i);
      }
      return a;
    }, [])
    .reverse();
  for (let idx of checkedProductIdx) {
    newCarts.splice(idx, 1);
  }

  return updateObject(state, {
    carts: newCarts,
  });
};

const setStateProductAllCheck = (state) => {
  const newCarts = state.carts.map((product) => ({
    ...product,
    isChecked: !state.isCheckedAll,
  }));

  return updateObject(state, { carts: newCarts, isCheckedAll: !state.isCheckedAll });
};

const setStateProductCheck = (state, action) => {
  const newCarts = [...state.carts];
  newCarts[action.productIdx].isChecked = !newCarts[action.productIdx].isChecked;

  return updateObject(state, { carts: newCarts });
};

const setStateAllCheckboxTrue = (state) => {
  return updateObject(state, { isCheckedAll: true });
};

const setStateAllCheckboxFalse = (state) => {
  return updateObject(state, { isCheckedAll: false });
};

// reducer
export default function cart(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CART_ADD:
      return setStateCartAdd(state, action);
    case REQUEST_CART_ADD_FAIL:
      return setStateCartAddFail(state, action);
    case REQUEST_EXIST_PRODUCT_ADD:
      return setStateExistProductAdd(state, action);
    case REQUEST_EXIST_PRODUCT_DECREASE:
      return setStateExistProductDecrease(state, action);
    case REQUEST_UPDATE_PRODUCT_QUANTITY:
      return setStateUpdateProductQuantity(state, action);
    case REQUEST_PRODUCT_DELETE:
      return setStateProductDelete(state, action);
    case REQUEST_CHECKED_PRODUCT_DELETE:
      return setStateCheckedProductDelete(state);
    case REQUEST_PRODUCT_CHECK:
      return setStateProductCheck(state, action);
    case REQUEST_PRODUCT_ALL_CHECK:
      return setStateProductAllCheck(state);
    case REQUEST_ALL_CHECKBOX_TRUE:
      return setStateAllCheckboxTrue(state);
    case REQUEST_ALL_CHECKBOX_FALSE:
      return setStateAllCheckboxFalse(state);
    default:
      return state;
  }
}
