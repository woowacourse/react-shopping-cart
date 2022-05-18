import { useDispatch, useSelector } from 'react-redux';

function useReduxState(stateKey) {
  const state = useSelector(state => state[stateKey]);
  const dispatch = useDispatch();

  return {
    state,
    dispatch,
  };
}

export default useReduxState;
