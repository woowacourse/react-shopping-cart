import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as Styled from './style';
import PALETTE from '../../../constants/palette';

const snackbarRoot = document.getElementById('snackbar-root');

const Snackbar = ({ message, duration, backgroundColor }) => {
  return ReactDOM.createPortal(
    <Styled.SnackbarContainer backgroundColor={backgroundColor} duration={duration}>
      {message}
    </Styled.SnackbarContainer>,
    snackbarRoot
  );
};

Snackbar.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  backgroundColor: PropTypes.string,
};

Snackbar.defaultProps = {
  duration: 3000,
  backgroundColor: PALETTE.BLACK,
};

export default Snackbar;
