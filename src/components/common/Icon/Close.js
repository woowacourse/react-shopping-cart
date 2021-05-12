import React from 'react';
import PropTypes from 'prop-types';
import PALETTE from '../../../constants/palette';

const Close = ({ width, color }) => {
  return (
    <svg width={width} stroke={color} strokeLinecap="round" strokeWidth={4} viewBox="0 0 40 40">
      <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
    </svg>
  );
};

Close.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

Close.defaultProps = {
  width: '2rem',
  color: PALETTE.BLACK,
};

export default Close;
