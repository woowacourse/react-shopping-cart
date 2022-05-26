import {
  CART_DELETE,
  CART_DELETE_ERROR,
  CART_DELETE_SUCCESS,
  CART_INITIALIZE,
  CART_INITIALIZE_ERROR,
  CART_INITIALIZE_SUCCESS,
  CART_POST,
  CART_POST_ERROR,
  CART_POST_SUCCESS,
  CART_PUT,
  CART_PUT_ERROR,
  CART_PUT_SUCCESS,
} from 'actions/action';

const initState = {
  shoppingCarts: {
    shoppingCartListLoading: false,
    shoppingCartList: [],
    shoppingCartListError: null,
  },
};

function shoppingCartReducer(state = initState, action) {
  switch (action.type) {
    case CART_INITIALIZE:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: true,
          shoppingCartList: [],
          shoppingCartListError: null,
        },
      };
    case CART_INITIALIZE_SUCCESS:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: action.shoppingCartList.data,
          shoppingCartListError: null,
        },
      };
    case CART_INITIALIZE_ERROR:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: [],
          shoppingCartListError: action.error,
        },
      };
    case CART_POST:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: true,
          shoppingCartList: [],
          shoppingCartListError: null,
        },
      };
    case CART_POST_SUCCESS:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: action.shoppingCartList.data,
          shoppingCartListError: null,
        },
      };
    case CART_POST_ERROR:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: [],
          shoppingCartListshoppingCartListError: action.error,
        },
      };
    case CART_PUT:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: true,
          shoppingCartList: [],
          shoppingCartListError: null,
        },
      };
    case CART_PUT_SUCCESS:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: action.shoppingCartList.data,
          shoppingCartListError: null,
        },
      };
    case CART_PUT_ERROR:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: [],
          shoppingCartListError: action.error,
        },
      };
    case CART_DELETE:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: true,
          shoppingCartList: [],
          shoppingCartListError: null,
        },
      };
    case CART_DELETE_SUCCESS:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: action.shoppingCartList.data,
          shoppingCartListError: null,
        },
      };
    case CART_DELETE_ERROR:
      return {
        ...state,
        shoppingCarts: {
          shoppingCartListLoading: false,
          shoppingCartList: [],
          shoppingCartListError: action.error,
        },
      };
    default:
      return state;
  }
}

export default shoppingCartReducer;
