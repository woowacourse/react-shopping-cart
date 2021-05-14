import PropTypes from 'prop-types';
import React from 'react';
import * as Styled from './style';

const Snackbar = ({ message, ms, backgroundColor }) => {
  return (
    <Styled.SnackbarContainer backgroundColor={backgroundColor} time={`${ms / 1000}s`}>
      {message}
    </Styled.SnackbarContainer>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  ms: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
