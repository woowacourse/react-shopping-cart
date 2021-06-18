import { useEffect, useReducer } from 'react';
import { LOADING, SUCCESS, FAILURE } from '../constants/status';

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        isLoading: true,
        data: null,
        error: null,
      };
    case SUCCESS:
      return {
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case FAILURE:
      return {
        isLoading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFetch = ({ asyncFunc, args }, deps = []) => {
  const [state, dispatch] = useReducer(reducer, { isLoading: false, data: null, error: null });

  const fetchData = async () => {
    dispatch({ type: LOADING });

    try {
      let data;
      if (args) {
        data = await asyncFunc(...args);
      } else {
        data = await asyncFunc();
      }

      dispatch({ type: SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: FAILURE, payload: err });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { state, fetchData };
};
