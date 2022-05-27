import { useDispatch, useSelector } from 'react-redux';

const useReduxState = (key = '') => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[key]);

  return { dispatch, state };
};

export default useReduxState;
