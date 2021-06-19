import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import PALETTE from '../../../constants/palette';
import * as Styled from './style';

const snackbarRoot = document.getElementById('snackbar-root');

const Snackbar = ({ message, duration, backgroundColor }) => {
  return ReactDOM.createPortal(
    <Styled.SnackbarContainer key={Date.now()} backgroundColor={backgroundColor} duration={duration}>
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
