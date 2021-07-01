import React from 'react';
import PropTypes from 'prop-types';
import PALETTE from '../../../constants/palette';

const Plus = ({ width, color }) => {
  return (
    <svg width={width} height={width} viewBox="0 0 24 24" fill={color}>
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g>
          <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
        </g>
      </g>
    </svg>
  );
};

Plus.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

Plus.defaultProps = {
  width: '2rem',
  color: PALETTE.BLACK,
};

export default Plus;
