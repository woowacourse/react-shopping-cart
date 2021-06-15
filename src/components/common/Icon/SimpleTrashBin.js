import React from 'react';
import PropTypes from 'prop-types';
import PALETTE from '../../../constants/palette';

const SimpleTrashBin = ({ width, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={width} viewBox="0 0 24 24" width={width} fill={color}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
    </svg>
  );
};

SimpleTrashBin.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

SimpleTrashBin.defaultProps = {
  width: '2rem',
  color: PALETTE.BLACK,
};

export default SimpleTrashBin;
