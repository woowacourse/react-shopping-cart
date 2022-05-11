import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import axios from 'axios';

const initialState = { products: { data: [], loading: false, error: null } };

const productsReducer = (state = initialState, action) => {
  // loading을 false에서 true로 바꿔준다(로딩중 -> 스켈레톤 UI을 보여준다)
  if (action.type === 'GET_PRODUCTS') {
    return { ...state, products: { ...state.products, loading: true } };
  }
  // 스켈레톤 UI을 끈다. thunk를 통해 가져온 비동기 data를 넣어준다.
  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    return {
      ...state,
      products: { ...state.products, loading: false, data: action.data },
    };
  }
  if (action.type === 'GET_PRODUCTS_ERROR') {
    return {
      ...state,
      products: { ...state.products, loading: false, error: action.error },
    };
  }

  return state;
};

const store = createStore(
  productsReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export default store;

// thunk가 설치되어 있을 때, dispatch의 인자로 넘겨주는 함수이다.
// 비동기로 데이터를 받아온 후, 그 비동기결과(data, error)인 payload를 `{type: 액션타입, payload}` 객체로 만들어 dispatch에 넣은 후 해당 dispatch를 실행한다.
export const getProductsAsync = async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS' });
  try {
    const { data } = await axios.get(
      'https://shopping-cart-json-server123.herokuapp.com/products',
    );
    dispatch({ type: 'GET_PRODUCTS_SUCCESS', data });
  } catch (error) {
    dispatch({ type: 'GET_PRODUCTS_ERROR', error });
  }
};
