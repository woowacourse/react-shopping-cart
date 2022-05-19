const { useDispatch, useSelector } = require('react-redux');

function useReduxState(key) {
  const state = useSelector((reduxState) => reduxState[key]);
  return { dispatch: useDispatch(), state };
}

export default useReduxState;
