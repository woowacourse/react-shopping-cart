import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Snackbar = ({ text, time, backgroundColor }) => {
  return (
    <Styled.SnackbarContainer backgroundColor={backgroundColor} time={time}>
      {text}
    </Styled.SnackbarContainer>
  );
};

Snackbar.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Snackbar;
