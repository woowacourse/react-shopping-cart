import {useDispatch, useSelector} from 'react-redux';

const useReducerSelect = (reducer) => {
  const dispatch = useDispatch();
  const {pending, error, data} = useSelector((state) => state[reducer]);

  return {dispatch, pending, error, data};
};

export default useReducerSelect;
