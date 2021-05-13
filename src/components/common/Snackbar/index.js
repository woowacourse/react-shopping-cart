import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Snackbar = ({ text, time, setMessage, backgroundColor }) => {
  const [isShowing, setIsShowing] = useState(true);
  const timer = setTimeout(() => setIsShowing(false), time);

  useEffect(() => {
    return () => {
      setMessage('');
      clearTimeout(timer);
    };
  }, [isShowing]);

  return (
    <Styled.SnackbarContainer backgroundColor={backgroundColor} time={`${time / 1000}s`}>
      {text}
    </Styled.SnackbarContainer>
  );
};

Snackbar.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.number,
  setMessage: PropTypes.func,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
