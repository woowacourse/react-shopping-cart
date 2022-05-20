import { useReducer, createContext } from 'react';

const CHECK_ALL = 'checkAll';
const UNCHECK_ALL = 'uncheckAll';
const CHECK_ONE = 'checkOne';
const UNCHECK_ONE = 'uncheckOne';

const initialState = {
  checked: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHECK_ALL:
      return { ...state, checked: action.payload };
    case UNCHECK_ALL:
      return { ...state, checked: [] };
    case CHECK_ONE:
      return { ...state, checked: state.checked.concat(action.payload) };
    case UNCHECK_ONE:
      return {
        ...state,
        checked: state.checked.filter((check) => check !== action.payload),
      };
    default:
      return { ...state };
  }
};

const CheckContext = createContext();

const CheckProvider = () => {
  const [state, contextDispatch] = useReducer(reducer, initialState);

  return {
    CheckContext,
    state,
    contextDispatch,
  };
};
