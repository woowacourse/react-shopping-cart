import { TYPE } from 'store/carts/action';

const initialState = {
  carts: [],
  cartsError: null,
};

export const cartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.CARTS_LOAD:
      return { ...state, carts: action.payload, cartsError: null };
    case TYPE.CARTS_ADD:
      return {
        ...state,
        carts: state.carts.concat(action.payload),
        cartsError: null,
      };
    case TYPE.CARTS_DELETE:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
        cartsError: null,
      };
    case TYPE.CARTS_UPDATE:
      return {
        ...state,
        carts: state.carts.map((cart) => {
          if (cart.id === action.payload.id) {
            return action.payload;
          }
          return cart;
        }),
        cartsError: null,
      };
    case TYPE.CARTS_ERROR:
      return { ...state, cartsError: action.payload };
    case TYPE.CARTS_CLEAN_ERROR:
      return { ...state, cartsError: null };
    default:
      return state;
  }
};
