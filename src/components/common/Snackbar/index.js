import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as Styled from './style';

const Snackbar = ({ message, ms, backgroundColor }) => {
  const content = (
    <Styled.SnackbarContainer backgroundColor={backgroundColor} time={`${ms / 1000}s`}>
      {message}
    </Styled.SnackbarContainer>
  );
  return ReactDOM.createPortal(content, document.querySelector('#snackbar'));
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  ms: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
