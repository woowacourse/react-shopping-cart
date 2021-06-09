import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Snackbar from '../components/common/Snackbar';

import useUpdateEffect from './useUpdateEffect';
import { resetSnackbar, setSnackbar } from '../redux/Snackbar/actions';

const useSnackbar = (ms) => {
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

  const SnackbarComponent = ({ backgroundColor }) =>
    message.text && <Snackbar key={Math.random()} message={message.text} ms={ms} backgroundColor={backgroundColor} />;

  SnackbarComponent.propTypes = {
    backgroundColor: PropTypes.string,
  };

  return [message.text, setSnackbarMessage, SnackbarComponent];
};

export default useSnackbar;
