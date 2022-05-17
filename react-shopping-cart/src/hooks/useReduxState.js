import { useDispatch, useSelector } from 'react-redux';

function useReduxState(selectorKey) {
  const dispatch = useDispatch();
  const state = useSelector(state => state[selectorKey]);

  return {
    dispatch,
    state,
  };
}

export default useReduxState;
