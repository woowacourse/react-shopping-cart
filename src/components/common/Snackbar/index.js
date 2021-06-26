import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as Styled from './style';
import PALETTE from '../../../constants/palette';
import { SNACKBAR_DURATION } from '../../../constants/appInfo';
import useSnackbar from '../../../hooks/useSnackbar';

const Snackbar = ({ ms = SNACKBAR_DURATION, backgroundColor = PALETTE.GRAY_008 }) => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar();

  const content = snackbarMessage && (
    <Styled.SnackbarContainer key={Math.random()} backgroundColor={backgroundColor} time={`${ms / 1000}s`}>
      {snackbarMessage}
    </Styled.SnackbarContainer>
  );
  return ReactDOM.createPortal(content, document.querySelector('#snackbar'));
};

Snackbar.propTypes = {
  ms: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
