import React from 'react';
import PropTypes from 'prop-types';
import PALETTE from '../../../constants/palette';

const Minus = ({ width, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} viewBox="0 0 24 24" width={width} fill={color}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
};

Minus.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

Minus.defaultProps = {
  width: '2rem',
  color: PALETTE.BLACK,
};

export default Minus;
