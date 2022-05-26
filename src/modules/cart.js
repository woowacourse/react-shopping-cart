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

const initialState = {
  carts: [],
  errorMessage: '',
  isCheckedAll: false,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CART_ADD:
      return {
        ...state,
        carts: [
          ...state.carts,
          { ...action.product, quantity: 1, isChecked: true, total: action.product.price },
        ],
      };
    case REQUEST_CART_ADD_FAIL:
      return {
        ...state,
        errorMessage: action.error,
      };
    case REQUEST_EXIST_PRODUCT_ADD: {
      const newCarts = [...state.carts];
      newCarts[action.productIdx].quantity += 1;
      newCarts[action.productIdx].total =
        newCarts[action.productIdx].price * newCarts[action.productIdx].quantity;

      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_EXIST_PRODUCT_DECREASE: {
      const newCarts = [...state.carts];
      newCarts[action.productIdx].quantity -= 1;
      newCarts[action.productIdx].total -= newCarts[action.productIdx].price;

      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_UPDATE_PRODUCT_QUANTITY: {
      const newCarts = [...state.carts];
      newCarts[action.productIdx].quantity = action.newQuantity;
      newCarts[action.productIdx].total = newCarts[action.productIdx].price * action.newQuantity;

      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_PRODUCT_DELETE: {
      const newCarts = [...state.carts];
      newCarts.splice(action.productIdx, 1);
      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_CHECKED_PRODUCT_DELETE: {
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
      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_PRODUCT_CHECK: {
      const newCarts = [...state.carts];

      newCarts[action.productIdx].isChecked = !newCarts[action.productIdx].isChecked;
      return {
        ...state,
        carts: newCarts,
      };
    }
    case REQUEST_PRODUCT_ALL_CHECK: {
      const newCarts = state.carts.map((product) => ({
        ...product,
        isChecked: !state.isCheckedAll,
      }));

      return {
        ...state,
        carts: newCarts,
        isCheckedAll: !state.isCheckedAll,
      };
    }
    case REQUEST_ALL_CHECKBOX_TRUE:
      return {
        ...state,
        isCheckedAll: true,
      };
    case REQUEST_ALL_CHECKBOX_FALSE:
      return {
        ...state,
        isCheckedAll: false,
      };
    default:
      return state;
  }
}
