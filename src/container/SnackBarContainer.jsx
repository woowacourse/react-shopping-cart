import SnackBar from 'component/common/SnackBar';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { clearSnackBar } from 'store/action/snackBarActions';
import { SNACKBAR_RUNNING_TIME } from 'constant';

function SnackBarContainer() {
  const dispatch = useDispatch();
  const timer = useRef();
  const message = useSelector(store => store.snackBar);

  if (timer.current) {
    clearTimeout(timer.current);
  }

  timer.current = setTimeout(() => {
    dispatch(clearSnackBar());
  }, SNACKBAR_RUNNING_TIME);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return <SnackBar message={message.text} />;
}

export default SnackBarContainer;
