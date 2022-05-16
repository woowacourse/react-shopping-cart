import { actionTypes } from 'reducers/cart/cart.actions';

const initialState = {
  cartList: [],
  isLoadingGetCart: false,
  isErrorGetCart: false,
  isLoadingAddCart: false,
  isErrorAddCart: false,
};

// const addCartList = (cartList, newCartItem) => {
//   const isExisted =
//     cartList.findIndex(({ id }) => id === newCartItem.id) !== -1;

//   if (isExisted) {
//     return cartList.map((item) => {
//       if (item.id === newCartItem.id) {
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     });
//   }

//   return [...cartList, newCartItem];
// };

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART) {
    return { ...state, isLoadingGetCart: true };
  }

  if (action.type === actionTypes.GET_CART_SUCCESS) {
    return {
      ...state,
      isLoadingGetCart: false,
      cartList: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_ERROR) {
    return {
      ...state,
      isLoadingGetCart: false,
      isErrorGetCart: true,
    };
  }

  if (action.type === actionTypes.ADD_CART) {
    return {
      ...state,
      isLoadingAddCart: true,
    };
  }

  if (action.type === actionTypes.ADD_CART_SUCCESS) {
    // console.log('@', state.data);
    // console.log('#', action.data);
    return {
      ...state,
      isLoadingAddCart: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.ADD_CART_ERROR) {
    return {
      ...state,
      isLoadingAddCart: false,
      isErrorAddCart: true,
    };
  }

  return state;
};

export default cartReducer;
