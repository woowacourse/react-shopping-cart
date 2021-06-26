import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SNACKBAR_DURATION } from '../constants/appInfo';

import useUpdateEffect from './useUpdateEffect';
import { resetSnackbar, setSnackbar } from '../redux/Snackbar/actions';

const useSnackbar = (ms = SNACKBAR_DURATION) => {
  const { message } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const timer = useRef(null);

  const setSnackbarMessage = (text) => {
    dispatch(setSnackbar(text));
  };

  useUpdateEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      dispatch(resetSnackbar());
    }, ms + 100); // add 100ms for fadeout animation
  }, [message]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      dispatch(resetSnackbar());
    };
  }, []);

  return [message.text, setSnackbarMessage];
};

export default useSnackbar;
