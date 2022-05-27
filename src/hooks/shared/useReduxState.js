import { useDispatch, useSelector } from 'react-redux';

const useReduxState = (key = '') => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state[key]);

  return { dispatch, isLoading, data, isError };
};

export default useReduxState;
