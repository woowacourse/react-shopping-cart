import React from 'react';
import PropTypes from 'prop-types';

import PALETTE from '../../../constants/palette';

const Spinner = ({ width, color }) => {
  return (
    <svg width={width} height={width} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth="15"
        r="40"
        strokeDasharray="188.49555921538757 64.83185307179586"
        transform="matrix(1,0,0,1,0,0)"
      />
    </svg>
  );
};

Spinner.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  width: '20rem',
  color: PALETTE.BAEMINT,
};

export default Spinner;
