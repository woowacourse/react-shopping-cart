import React from 'react';

import LineStyled from './style';

function Line({ width, height, color }) {
  return <LineStyled width={width} height={height} color={color} />;
}

export default Line;
