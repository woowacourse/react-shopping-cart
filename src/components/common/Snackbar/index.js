import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as Styled from './style';
import PALETTE from '../../../constants/palette';
import useSnackbar from '../../../hooks/useSnackbar';

const Snackbar = ({ duration = 1000, backgroundColor = PALETTE.GRAY_008 }) => {
  const [snackbarMessage, setSnackbarMessage, isContentExists] = useSnackbar();

  const content = isContentExists && (
    <Styled.SnackbarContainer key={Math.random()} backgroundColor={backgroundColor} time={`${duration / 1000}s`}>
      {snackbarMessage}
    </Styled.SnackbarContainer>
  );
  return ReactDOM.createPortal(content, document.querySelector('#snackbar'));
};

Snackbar.propTypes = {
  duration: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
